#!/usr/bin/env node
import commander from "commander";
import { copyFileSync, unlinkSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";
import yaml from "yaml";
commander.option(
  "-w --working-path <path>",
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
    //copy the file to working path
    const dest = join(commander.workingPath, "__appsync-compiler.ts");
    copyFileSync(join(__dirname, "..", "templates", "bin.ts"), dest);
    spawnSync("npx", ["ts-node", dest, "wrapper", "--output", output], {
      stdio: "inherit",
    });
    unlinkSync(dest);
  });
commander
  .command("serverless")
  .description("Update serverless.yml with data resolvers for appsync")
  .option(
    "-y --yamlfile <path>",
    "Path to serverless.yml file",
    "./serverless.yml"
  )
  .action(({ yamlfile }) => {
    const dest = join(commander.workingPath, "__appsync-compiler.ts");
    copyFileSync(join(__dirname, "..", "templates", "bin.ts"), dest);
    spawnSync("npx", ["ts-node", dest, "serverless", "--yamlfile", yamlfile], {
      stdio: "inherit",
    });
    unlinkSync(dest);
  });
commander
  .command("add-serverless-function")
  .description("Update serverless with appsync function reference")
  .option(
    "-y --yamlfile <path>",
    "Path to serverless.yml file",
    "./serverless.yml"
  )
  .action(({ yamlfile }) => {
    console.log({ yamlfile });
    const oldString = readFileSync(yamlfile, { encoding: "utf-8" });
    const y = yaml.parse(oldString);
    if (!y.functions)
      y.functions = {
        appSyncResolver: {
          name: "appSyncResolver",
          handler: "_appsync_wrapper.appSyncResolver",
        },
      };
    else
      y.functions["appSyncResolver"] = {
        name: "appSyncResolver",
        handler: "_appsync_wrapper.appSyncResolver",
      };

    const newString = yaml.stringify(y);
    if (newString !== oldString) writeFileSync(yamlfile, newString);
  });
commander.parse(process.argv);
export { commander };
