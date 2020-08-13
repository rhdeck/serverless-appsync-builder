#!/usr/bin/env node
import commander from "commander";
import { readFileSync, existsSync, writeFile, writeFileSync } from "fs";
import { join, resolve } from "path";
import {
  AppsyncResolverWrapper,
  makeAppSyncText,
  makeMappingTemplates,
  buildServerlessAppsync,
  inspect as _inspect,
} from "@raydeck/serverless-appsync-builder";
import yaml, { scalarOptions } from "yaml";
import { strOptions } from "yaml/types";
/**
 * Get the path to a node dependency, traversing up the tree as expected
 * @internal
 * @param key Identifier of the node package to find
 * @param cwd Context for working directory (changes with recursive calls)
 */
function dependencyPath(key: string, cwd: string = process.cwd()): string {
  if (existsSync(join(cwd, "node_modules", key)))
    return join(cwd, "node_modules", key);
  else if (cwd !== resolve(cwd, ".."))
    return dependencyPath(key, resolve(cwd, ".."));
  else throw "Could not find dependency " + key;
}
export function inspect(path: string) {
  const exports = <{ [key: string]: { appSyncResolver: string } }>require(path);
  return _inspect(exports);
}
/**
 * Extract all appsync object candidates from descendant trees
 * @internal
 * @param workingPath Context from which to evaluate current paths
 */
function extractAppsync(workingPath: string = process.cwd()) {
  //look in child directories for my many many lambdas
  const { dependencies, devDependencies, resolvers } = JSON.parse(
    readFileSync(join(workingPath, "package.json"), { encoding: "utf-8" })
  );
  const allDeps = { ...(dependencies || {}), ...(devDependencies || {}) };
  const foundExports: [string, AppsyncResolverWrapper[]][] = [];
  Object.entries(allDeps).forEach(([key, info]) => {
    const projectPath = join(
      dependencyPath(key, process.cwd()),
      "package.json"
    );
    const { resolvers } = JSON.parse(
      readFileSync(projectPath, { encoding: "utf-8" })
    );
    if (resolvers) {
      const filePath = join(key, resolvers);
      const x = inspect(filePath);
      foundExports.push([filePath, x]);
    }
    //Look for lambdas key
  });
  //Look for lambdas key here
  if (resolvers) {
    foundExports.push([resolvers, inspect(<string>resolvers)]);
  } else if (existsSync(join(process.cwd(), "handlers.ts"))) {
    foundExports.push(["./handlers", inspect("./handlers")]);
  }
  return foundExports;
}
commander.option(
  "-w --workingpath <path>",
  "Working directory for project",
  "."
);
commander
  .command("wrapper")
  .description("Build wrapper ts file for lambdas")
  .option(
    "-o --output <outputfile>",
    "Output to write to",
    "./_appsync_wrapper.ts"
  )
  .action(({ output }) => {
    const lambdaObj = extractAppsync(commander.workingPath);
    const text = makeAppSyncText(lambdaObj);
    const oldText =
      existsSync(output) && readFileSync(output, { encoding: "utf-8" });
    if (oldText !== text) writeFileSync(output, text);
  });
commander
  .command("serverless")
  .description("Update serverless.yml with functions")
  .option(
    "-y --yamlfile <path>",
    "Path to serverless.yml file",
    "./serverless.yml"
  )
  .option("-a --add-function", "Add serverless-specific function", false)
  .action(({ yamlfile, addFunction }) => {
    const lambdaObj = extractAppsync(commander.workingPath);
    makeMappingTemplates(lambdaObj.flatMap(([path, resolvers]) => resolvers));
    const oldString = readFileSync(yamlfile, { encoding: "utf-8" });
    const y = yaml.parse(oldString);
    y.custom.appsync = {
      ...y.custom.appsync,
      ...buildServerlessAppsync(lambdaObj),
    };
    /* @ts-ignore */
    strOptions.defaultType = "QUOTE_DOUBLE";
    const newString = yaml.stringify(y);
    if (newString !== oldString) writeFileSync(yamlfile, newString);
  });
commander.parse(process.argv);
export { commander };
