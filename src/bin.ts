#!/usr/bin/env node
import commander from "commander";
import { copyFileSync, unlinkSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";
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
    "./appsync_wrapper.ts"
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
  .description("Update serverless.yml with functions")
  .option("-y --yamlfile", "Path to serverless.yml file", "./serverless.yml")
  .action(({ yamlfile }) => {
    const dest = join(commander.workingPath, "__appsync-compiler.ts");
    copyFileSync(join(__dirname, "..", "templates", "bin.ts"), dest);
    spawnSync("npx", ["ts-node", dest, "serverless", "--yamlfile", yamlfile], {
      stdio: "inherit",
    });
    unlinkSync(dest);
  });
commander.parse(process.argv);
export { commander };
