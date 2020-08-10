
<a name="__climd"></a>

# Usage
```bash
@raydeck/serverless-appsync-builder [options] [command]
```
# Options
* -w --workingpath \<`path`> Working directory for project (default: .
# Commands
## wrapper
Build wrapper ts file for lambdas
### Usage
```bash
@raydeck/serverless-appsync-builder wrapper [options]
```
### Options
* -o --output \<`outputfile`> Output to write to (default: ./appsync_wrapper.ts
## serverless
Update serverless.yml with functions
### Usage
```bash
@raydeck/serverless-appsync-builder serverless [options]
```
### Options
* -y --yamlfile Path to serverless.yml file 

<a name="_librarymd"></a>

[@raydeck/serverless-appsync-builder - v1.0.0](README.md)

# @raydeck/serverless-appsync-builder - v1.0.0

## Index

### Interfaces

* [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)
* [AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)

### Functions

* [buildServerlessAppsync](#buildserverlessappsync)
* [dependencyPath](#dependencypath)
* [extractAppsync](#extractappsync)
* [findTemplate](#findtemplate)
* [flatten](#flatten)
* [inspect](#inspect)
* [makeAppSyncText](#makeappsynctext)
* [makeAppsyncImports](#makeappsyncimports)
* [makeAppsyncLambda](#makeappsynclambda)
* [makeFieldResolver](#makefieldresolver)
* [makeMappingTemplate](#makemappingtemplate)
* [makeMappingTemplates](#makemappingtemplates)
* [makeMutationResolver](#makemutationresolver)
* [makeQueryResolver](#makequeryresolver)
* [resolveCursor](#resolvecursor)
* [withBatch](#withbatch)

## Functions

###  buildServerlessAppsync

▸ **buildServerlessAppsync**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *object | object*

*Defined in [index.ts:252](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L252)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *object | object*

___

###  dependencyPath

▸ **dependencyPath**(`key`: string, `cwd`: string): *string*

*Defined in [bin.ts:19](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/bin.ts#L19)*

Get the path to a node dependency, traversing up the tree as expected

**`internal`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`key` | string | - | Identifier of the node package to find |
`cwd` | string | process.cwd() | Context for working directory (changes with recursive calls)  |

**Returns:** *string*

___

###  extractAppsync

▸ **extractAppsync**(`workingPath`: string): *[string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]*

*Defined in [bin.ts:31](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/bin.ts#L31)*

Extract all appsync object candidates from descendant trees

**`internal`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`workingPath` | string | process.cwd() | Context from which to evaluate current paths  |

**Returns:** *[string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]*

___

###  findTemplate

▸ **findTemplate**(`filename`: string, `currentPath`: string): *string*

*Defined in [index.ts:95](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L95)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`filename` | string | - |
`currentPath` | string | process.cwd() |

**Returns:** *string*

___

###  flatten

▸ **flatten**(`paths`: object[]): *[AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)[]*

*Defined in [index.ts:90](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`paths` | object[] |

**Returns:** *[AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)[]*

___

###  inspect

▸ **inspect**(`path`: string): *[AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]*

*Defined in [index.ts:54](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]*

___

###  makeAppSyncText

▸ **makeAppSyncText**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *string*

*Defined in [index.ts:186](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *string*

___

###  makeAppsyncImports

▸ **makeAppsyncImports**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *string*

*Defined in [index.ts:148](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *string*

___

###  makeAppsyncLambda

▸ **makeAppsyncLambda**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *undefined | ""*

*Defined in [index.ts:162](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *undefined | ""*

___

###  makeFieldResolver

▸ **makeFieldResolver**‹**T**›(`args`: object): *object*

*Defined in [index.ts:11](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L11)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`field?` | undefined &#124; string |
`func` | function |
`type?` | undefined &#124; string |

**Returns:** *object*

* **appSyncResolver**: *string* = "appsync"

* **field**: *undefined | string* = args.field

* **func**(): *function*

  * (`args`: T): *Promise‹any›*

* **type**: *undefined | string* = args.type

___

###  makeMappingTemplate

▸ **makeMappingTemplate**(`template`: [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd), `mappingTemplatesPath`: string, `path`: string): *void*

*Defined in [index.ts:105](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L105)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`template` | [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd) | - |
`mappingTemplatesPath` | string | "mapping-templates" |
`path` | string | process.cwd() |

**Returns:** *void*

___

###  makeMappingTemplates

▸ **makeMappingTemplates**(`resolvers`: [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[], `mappingTemplatesPath`: string, `path`: string): *void*

*Defined in [index.ts:131](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L131)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`resolvers` | [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[] | - |
`mappingTemplatesPath` | string | "mapping-templates" |
`path` | string | process.cwd() |

**Returns:** *void*

___

###  makeMutationResolver

▸ **makeMutationResolver**‹**T**›(`args`: object): *object*

*Defined in [index.ts:34](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L34)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`field?` | undefined &#124; string |
`func` | function |

**Returns:** *object*

* **appSyncResolver**: *string* = "appsync"

* **field**: *undefined | string* = args.field

* **func**(): *function*

  * (`args`: T): *Promise‹any›*

* **type**: *string* = "Mutation"

___

###  makeQueryResolver

▸ **makeQueryResolver**‹**T**›(`args`: object): *object*

*Defined in [index.ts:23](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L23)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`field?` | undefined &#124; string |
`func` | function |

**Returns:** *object*

* **appSyncResolver**: *string* = "appsync"

* **field**: *undefined | string* = args.field

* **func**(): *function*

  * (`args`: T): *Promise‹any›*

* **type**: *string* = "Query"

___

###  resolveCursor

▸ **resolveCursor**‹**ResolverFunc**›(`arr`: any[], `resolver`: ResolverFunc, `lastCursor?`: undefined | string, `hasNextPage`: boolean, `firstCursor?`: undefined | string, `hasPreviousPage`: boolean): *Promise‹object›*

*Defined in [index.ts:226](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L226)*

**Type parameters:**

▪ **ResolverFunc**: *function*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`arr` | any[] | [] |
`resolver` | ResolverFunc | - |
`lastCursor?` | undefined &#124; string | - |
`hasNextPage` | boolean | false |
`firstCursor?` | undefined &#124; string | - |
`hasPreviousPage` | boolean | false |

**Returns:** *Promise‹object›*

___

###  withBatch

▸ **withBatch**(`f`: function): *Promise‹(Anonymous function)›*

*Defined in [index.ts:193](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L193)*

**Parameters:**

▪ **f**: *function*

▸ (`event`: object, `ctx?`: any, `cb?`: any): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`event` | object |
`ctx?` | any |
`cb?` | any |

**Returns:** *Promise‹(Anonymous function)›*


<a name="interfacesappsyncresolverwrappermd"></a>

[@raydeck/serverless-appsync-builder - v1.0.0](../README.md) › [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)

# Interface: AppsyncResolverWrapper

## Hierarchy

* **AppsyncResolverWrapper**

  ↳ [AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)

## Index

### Properties

* [field](#field)
* [func](#func)
* [key](#key)
* [type](#type)

## Properties

###  field

• **field**: *string*

*Defined in [index.ts:47](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L47)*

___

###  func

• **func**: *function*

*Defined in [index.ts:48](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L48)*

#### Type declaration:

▸ (`args`: any): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

___

###  key

• **key**: *string*

*Defined in [index.ts:49](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L49)*

___

###  type

• **type**: *string*

*Defined in [index.ts:46](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L46)*


<a name="interfacesappsyncresolverwrapperfilemd"></a>

[@raydeck/serverless-appsync-builder - v1.0.0](../README.md) › [AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)

# Interface: AppsyncResolverWrapperFile

## Hierarchy

* [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)

  ↳ **AppsyncResolverWrapperFile**

## Index

### Properties

* [field](#field)
* [func](#func)
* [key](#key)
* [path](#path)
* [type](#type)

## Properties

###  field

• **field**: *string*

*Inherited from [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd).[field](#field)*

*Defined in [index.ts:47](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L47)*

___

###  func

• **func**: *function*

*Inherited from [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd).[func](#func)*

*Defined in [index.ts:48](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L48)*

#### Type declaration:

▸ (`args`: any): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

___

###  key

• **key**: *string*

*Inherited from [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd).[key](#key)*

*Defined in [index.ts:49](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L49)*

___

###  path

• **path**: *string*

*Defined in [index.ts:52](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L52)*

___

###  type

• **type**: *string*

*Inherited from [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd).[type](#type)*

*Defined in [index.ts:46](https://github.com/rhdeck/serverless-appsync-builder/blob/844dd21/src/index.ts#L46)*
