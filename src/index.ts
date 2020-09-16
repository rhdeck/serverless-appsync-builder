import {
  existsSync,
  mkdirSync,
  readFileSync,
  copyFileSync,
  writeFileSync,
} from "fs";
import { join, resolve, dirname } from "path";
import mustache from "mustache";
import prettier from "prettier";
export interface FieldResolverOutput<T> {
  type?: string;
  field?: string;
  func: (o: { args: T }) => Promise<any>;
  appSyncResolver: string;
}
export function makeFieldResolver<T>(
  argsOrFunc:
    | {
        type?: string;
        field?: string;
        func: (o: { args: T }) => Promise<any>;
      }
    | ((o: { args: T }) => Promise<any>)
): FieldResolverOutput<T> {
  if (typeof argsOrFunc === "function")
    return { appSyncResolver: "appSync", func: argsOrFunc };
  else
    return {
      appSyncResolver: "appSync",
      type: argsOrFunc.type,
      field: argsOrFunc.field,
      func: argsOrFunc.func,
    };
}
export function makeQueryResolver<T>(
  argsOrFunc:
    | {
        field?: string;
        func: (o: { args: T }) => Promise<any>;
      }
    | ((o: { args: T }) => Promise<any>)
): FieldResolverOutput<T> {
  if (typeof argsOrFunc === "function")
    return { appSyncResolver: "appSync", type: "Query", func: argsOrFunc };
  else
    return {
      appSyncResolver: "appSync",
      type: "Query",
      field: argsOrFunc.field,
      func: argsOrFunc.func,
    };
}
export function makeMutationResolver<T>(
  argsOrFunc:
    | {
        field?: string;
        func: (o: { args: T }) => Promise<any>;
      }
    | ((o: { args: T }) => Promise<any>)
): FieldResolverOutput<T> {
  if (typeof argsOrFunc === "function")
    return { appSyncResolver: "appSync", type: "Mutation", func: argsOrFunc };
  else
    return {
      appSyncResolver: "appSync",
      type: "Mutation",
      field: argsOrFunc.field,
      func: argsOrFunc.func,
    };
}
export interface AppsyncResolverWrapper {
  type: string;
  field: string;
  func: (args: any) => Promise<any>;
  key: string;
}
interface AppsyncResolverWrapperFile extends AppsyncResolverWrapper {
  path: string;
}
export function inspect(exports: {
  [key: string]: { appSyncResolver: string };
}) {
  const appSyncResolvers = Object.entries(exports)
    .map(([key, value]) => {
      try {
        if (value.appSyncResolver === "appSync") {
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
              const afterGet = key.substring(3);
              const forPos = afterGet.indexOf("For");
              lambda.type = afterGet.substring(0, forPos);
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
        console.error(e);
        return;
      }
    })
    .filter(Boolean);
  return <AppsyncResolverWrapper[]>appSyncResolvers;
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
  } else if (existsSync(join(__dirname, "..", "templates", filename))) {
    return join(__dirname, "..", "templates", filename);
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
        functionName: [template.type, template.field].join("_"),
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
  resolvers: [string, AppsyncResolverWrapper[]][]
) {
  return (
    "import { isArray as __appsync_isArray} from 'util';\n" +
    "import { withBatch } from '@raydeck/session-manager';\n" +
    resolvers
      .flatMap(([path, resolvers]) =>
        resolvers.map(({ key, type, field }) => {
          return `import { ${key} as ${type}_${field}} from "${path}";`;
        })
      )
      .join("\n")
  );
}
export function makeAppsyncLambda(
  resolvers: [string, AppsyncResolverWrapper[]][]
) {
  if (!resolvers.length) return "";
  const lines = [
    "export const resolvers: { [key: string]:(...args:any)=>Promise<any>} = {",
    ...resolvers.flatMap(([path, resolvers]) =>
      resolvers.map(
        ({ key, type, field }) => `${type}_${field}: ${type}_${field}.func,`
      )
    ),
    "};",
  ];
  lines.push(
    `export const appSyncResolver = {
        lambdaType: "lambda", func: async (a: { func: string, isBatch?: boolean},b?:any,c?:any)=>{`
  );
  lines.push("const toRun = resolvers[a.func];");
  lines.push(`if (__appsync_isArray(a)) {
      return withBatch(async(a,b,c)=> toRun(a,b,c))(a,b,c);
  } else {
      return toRun(a,b,c)
  }`);

  lines.push("}");
  lines.push("}");
  lines.push("export default resolvers");
  return lines.join("\n");
}
export function makeAppSyncText(
  resolvers: [string, AppsyncResolverWrapper[]][]
) {
  const imports = makeAppsyncImports(resolvers);
  const func = makeAppsyncLambda(resolvers);
  //   return [imports, func].join("\n");
  return prettier.format([imports, func].join("\n"), { parser: "typescript" });
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
export async function resolveBoolean(value: boolean) {
  return value;
}
export function buildServerlessAppsync(
  resolvers: [string, AppsyncResolverWrapper[]][]
) {
  if (!resolvers.length) return {};
  return {
    dataSources: [
      {
        name: "lambdaAppSyncResolver",
        type: "AWS_LAMBDA",
        config: {
          serviceRoleArn: { "Fn::GetAtt": ["MainRole", "Arn"] },
          lambdaFunctionArn: {
            "Fn::GetAtt": ["AppSyncResolverLambdaFunction", "Arn"],
          },
        },
      },
    ],
    mappingTemplates: resolvers
      .map(([path, resolvers]) =>
        resolvers.map((resolver) => ({
          dataSource: "lambdaAppSyncResolver",
          type: resolver.type,
          field: resolver.field,
          request: [resolver.type, resolver.field, "requestmap.txt"].join("_"),
          response: ["Query", "Mutation"].includes(resolver.type)
            ? "default-result-mapping-template.txt"
            : "default-batch-result-mapping-template.txt",
        }))
      )
      .flat(),
  };
}
