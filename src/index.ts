import {
  existsSync,
  mkdirSync,
  readFileSync,
  copyFileSync,
  writeFileSync,
} from "fs";
import { join, resolve, dirname } from "path";
import mustache from "mustache";
export function makeFieldResolver<T>(args: {
  type?: string;
  field?: string;
  func: (args: T) => Promise<any>;
}) {
  return {
    appSyncResolver: "appsync",
    type: args.type,
    field: args.field,
    func: args.func,
  };
}
export function makeQueryResolver<T>(args: {
  field?: string;
  func: (args: T) => Promise<any>;
}) {
  return {
    appSyncResolver: "appsync",
    type: "Query",
    field: args.field,
    func: args.func,
  };
}
export function makeMutationResolver<T>(args: {
  field?: string;
  func: (args: T) => Promise<any>;
}) {
  return {
    appSyncResolver: "appsync",
    type: "Mutation",
    field: args.field,
    func: args.func,
  };
}
interface AppsyncResolverWrapper {
  type: string;
  field: string;
  func: (args: any) => Promise<any>;
  key: string;
}
interface AppsyncResolverWrapperFile extends AppsyncResolverWrapper {
  path: string;
}
export function inspect(path: string) {
  const exports = <{ [key: string]: { appSyncResolver: string } }>require(path);
  const appSyncResolvers = Object.entries(exports)
    .map(([key, value]) => {
      try {
        if (value.appSyncResolver === "appsync") {
          //inspect for elements
          const lambda: AppsyncResolverWrapper = <any>{
            key,
            type: "",
            field: "",
            ...value,
          };
          if (!lambda.type) {
            if (/^get[A-Z][A-Za-z]*[For][get[A-Z][A-Za-z]*$/.test(key)) {
              //extract
              const afterGet = key.substring(4);
              const forPos = key.indexOf("For");
              lambda.type = afterGet.substring(0, forPos - 1);
              lambda.field = afterGet.substring(forPos + 3);
            } else {
              return;
            }
          } else if (!lambda.field) {
            //we should fix this
            lambda.field = key;
          }
          return lambda;
        }
      } catch (e) {
        return;
      }
    })
    .filter(Boolean);
  return appSyncResolvers;
}
export function flatten(
  paths: { path: string; resolver: AppsyncResolverWrapper }[]
): AppsyncResolverWrapperFile[] {
  return paths.map(({ path, resolver }) => ({ path, ...resolver }));
}
export function findTemplate(filename: string, currentPath = process.cwd()) {
  //Look first in process.cwd/templates and then in __dirname/templates
  if (existsSync(join(currentPath, "templates", filename))) {
    return join(currentPath, "templates", filename);
  } else if (existsSync(join(__dirname, "templates", filename))) {
    return join(__dirname, "templates", filename);
  } else {
    throw new Error("Could not find template " + filename);
  }
}
function makeMappingTemplate(
  template: AppsyncResolverWrapper,
  mappingTemplatesPath: string = "mapping-templates",
  path: string = process.cwd()
) {
  const resolvedPath = resolve(path, mappingTemplatesPath);
  const requestTemplateName = [
    template.type,
    template.field,
    "requestmap.txt",
  ].join("_");
  const baseTemplateName = ["Query", "Mutation"].includes(template.type)
    ? "request-mapping-template.txt"
    : "batch-request-mapping-template.txt";
  writeFileSync(
    join(resolvedPath, requestTemplateName),
    mustache.render(
      readFileSync(findTemplate(baseTemplateName), {
        encoding: "utf-8",
      }),
      {
        func: [template.type, template.field].join("_"),
      }
    )
  );
}
export function makeMappingTemplates(
  resolvers: AppsyncResolverWrapper[],
  mappingTemplatesPath: string = "mapping-templates",
  path: string = process.cwd()
) {
  const resolvedPath = resolve(path, mappingTemplatesPath);
  if (!existsSync(resolvedPath)) mkdirSync(resolvedPath);
  [
    "default-batch-result-mapping-template.txt",
    "default-result-mapping-template.txt",
  ].forEach((file) => {
    copyFileSync(findTemplate(file), join(resolvedPath, file));
  });
  resolvers.forEach((resolver) =>
    makeMappingTemplate(resolver, mappingTemplatesPath, path)
  );
}
export function makeAppsyncImports(
  resolvers: AppsyncResolverWrapperFile[],
  wrapperPath = "./handlers_wrapper.ts"
) {
  const dircontext = dirname(wrapperPath);
  return (
    "import { isArray as __appsync_isArray} from 'util';\n" +
    resolvers
      .map(({ key, path, type, field }) => {
        const resolvedPath = resolve(dircontext, path);
        return `import { ${key} as ${type}_${field} from "${resolvedPath}";`;
      })
      .join("\n")
  );
}
export function makeAppsyncLambda(
  resolvers: AppsyncResolverWrapper[],
  wrapperFunction: string | undefined
) {
  if (!resolvers.length) return "";
  const lines = [
    "const resolvers = {;",
    ...resolvers.map(({ key }) => `${key},`),
    "};",
  ];
  if (wrapperFunction)
    lines.push(
      `export const appsyncResolver = ${wrapperFunction}(async (a: { func: string, isBatch?: boolean},b,c)=>{`
    );
  else lines.push(`export async function appSyncResolver {`);
  lines.push("const toRun = resolvers[func];");
  lines.push(`if (__appsync_isArray(a)) {
      return withBatch(async(a,b,c)=> toRun(a,b,c))(a,b,c);
  } else {
      return toRun(a,b,c)
  }`);
  if (wrapperFunction) lines.push(`});`);
  else lines.push("}");
}
export async function withBatch(
  f: (event: { [key: string]: any }, ctx?: any, cb?: any) => Promise<any>
) {
  return async (event: { [key: string]: any }, ctx: any, cb: any) => {
    if (event.__isBatch) return f(event, ctx, cb);
    const results = await Promise.all(
      (<{ [key: string]: any }[]>event).map(async (event) => {
        const newevent = { ...event, __isBatch: true };
        try {
          const data = await f(newevent, ctx);
          return { data };
        } catch (error) {
          if (!error) console.error("Error was undefined");
          else {
            console.error(JSON.stringify(error));
            if (error.Fault) console.error(JSON.stringify(error.Fault.Error));
            if (error.fault) console.error(JSON.stringify(error.fault.error));
          }
          return {
            data: null,
            errorMessage: error
              ? error.message
                ? error.message.toString()
                : error
              : "Error was undefined",
            errorType: "ERROR",
          };
        }
      })
    );
    cb(null, results);
  };
}
export async function resolveCursor<
  ResolverFunc extends (...args: any) => Promise<any>
>(
  arr: any[] = [],
  resolver: ResolverFunc,
  lastCursor?: string,
  hasNextPage = false,
  firstCursor?: string,
  hasPreviousPage = false
): Promise<{
  edges: { node: ReturnType<ResolverFunc>; cursor: string }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    firstCursor: string | undefined;
    lastCursor: string | undefined;
  };
}> {
  const edges = await Promise.all(
    arr.map(async (o) => ({ node: await resolver(o), cursor: await o.getId() }))
  );
  return {
    edges,
    pageInfo: { hasNextPage, hasPreviousPage, firstCursor, lastCursor },
  };
}
