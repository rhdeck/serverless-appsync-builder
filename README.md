
<a name="__climd"></a>

# Usage
```bash
@raydeck/serverless-appsync-builder [options] [command]
```
# Options
* -w --working-path \<`path`> Working directory for project (default: .
# Commands
## wrapper
Build wrapper ts file for lambdas
### Usage
```bash
@raydeck/serverless-appsync-builder wrapper [options]
```
### Options
* -o --output \<`outputfile`> Output to write to (default: ./_appsync_wrapper.ts
## serverless
Update serverless.yml with data resolvers for appsync
### Usage
```bash
@raydeck/serverless-appsync-builder serverless [options]
```
### Options
* -y --yamlfile \<`path`> Path to serverless.yml file (default: ./serverless.yml
## add-serverless-function
Update serverless with appsync function reference
### Usage
```bash
@raydeck/serverless-appsync-builder add-serverless-function [options]
```
### Options
* -y --yamlfile \<`path`> Path to serverless.yml file (default: ./serverless.yml

<a name="_librarymd"></a>

[@raydeck/serverless-appsync-builder - v1.0.2](README.md)

# @raydeck/serverless-appsync-builder - v1.0.2

## Index

### Interfaces

* [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)
* [AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)
* [FieldResolverOutput](#interfacesfieldresolveroutputmd)

### Functions

* [buildServerlessAppsync](#buildserverlessappsync)
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
* [resolveBoolean](#resolveboolean)
* [resolveCursor](#resolvecursor)
* [withBatch](#withbatch)

## Functions

###  buildServerlessAppsync

▸ **buildServerlessAppsync**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *object | object*

*Defined in [index.ts:291](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L291)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *object | object*

___

###  findTemplate

▸ **findTemplate**(`filename`: string, `currentPath`: string): *string*

*Defined in [index.ts:126](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L126)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`filename` | string | - |
`currentPath` | string | process.cwd() |

**Returns:** *string*

___

###  flatten

▸ **flatten**(`paths`: object[]): *[AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)[]*

*Defined in [index.ts:121](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`paths` | object[] |

**Returns:** *[AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)[]*

___

###  inspect

▸ **inspect**(`exports`: object): *[AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]*

*Defined in [index.ts:81](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`exports` | object |

**Returns:** *[AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]*

___

###  makeAppSyncText

▸ **makeAppSyncText**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *string*

*Defined in [index.ts:221](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L221)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *string*

___

###  makeAppsyncImports

▸ **makeAppsyncImports**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *string*

*Defined in [index.ts:179](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L179)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *string*

___

###  makeAppsyncLambda

▸ **makeAppsyncLambda**(`resolvers`: [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][]): *string*

*Defined in [index.ts:194](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | [string, [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[]][] |

**Returns:** *string*

___

###  makeFieldResolver

▸ **makeFieldResolver**‹**T**›(`argsOrFunc`: object | function): *[FieldResolverOutput](#interfacesfieldresolveroutputmd)‹T›*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L17)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`argsOrFunc` | object &#124; function |

**Returns:** *[FieldResolverOutput](#interfacesfieldresolveroutputmd)‹T›*

___

###  makeMappingTemplate

▸ **makeMappingTemplate**(`template`: [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd), `mappingTemplatesPath`: string, `path`: string): *void*

*Defined in [index.ts:136](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L136)*

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

*Defined in [index.ts:162](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L162)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`resolvers` | [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)[] | - |
`mappingTemplatesPath` | string | "mapping-templates" |
`path` | string | process.cwd() |

**Returns:** *void*

___

###  makeMutationResolver

▸ **makeMutationResolver**‹**T**›(`argsOrFunc`: object | function): *[FieldResolverOutput](#interfacesfieldresolveroutputmd)‹T›*

*Defined in [index.ts:54](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L54)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`argsOrFunc` | object &#124; function |

**Returns:** *[FieldResolverOutput](#interfacesfieldresolveroutputmd)‹T›*

___

###  makeQueryResolver

▸ **makeQueryResolver**‹**T**›(`argsOrFunc`: object | function): *[FieldResolverOutput](#interfacesfieldresolveroutputmd)‹T›*

*Defined in [index.ts:36](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L36)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`argsOrFunc` | object &#124; function |

**Returns:** *[FieldResolverOutput](#interfacesfieldresolveroutputmd)‹T›*

___

###  resolveBoolean

▸ **resolveBoolean**(`value`: boolean): *Promise‹boolean›*

*Defined in [index.ts:288](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L288)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *Promise‹boolean›*

___

###  resolveCursor

▸ **resolveCursor**‹**ResolverFunc**›(`arr`: any[], `resolver`: ResolverFunc, `lastCursor?`: undefined | string, `hasNextPage`: boolean, `firstCursor?`: undefined | string, `hasPreviousPage`: boolean): *Promise‹object›*

*Defined in [index.ts:262](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L262)*

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

*Defined in [index.ts:229](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L229)*

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

[@raydeck/serverless-appsync-builder - v1.0.2](../README.md) › [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd)

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

*Defined in [index.ts:74](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L74)*

___

###  func

• **func**: *function*

*Defined in [index.ts:75](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L75)*

#### Type declaration:

▸ (`args`: any): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

___

###  key

• **key**: *string*

*Defined in [index.ts:76](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L76)*

___

###  type

• **type**: *string*

*Defined in [index.ts:73](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L73)*


<a name="interfacesappsyncresolverwrapperfilemd"></a>

[@raydeck/serverless-appsync-builder - v1.0.2](../README.md) › [AppsyncResolverWrapperFile](#interfacesappsyncresolverwrapperfilemd)

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

*Defined in [index.ts:74](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L74)*

___

###  func

• **func**: *function*

*Inherited from [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd).[func](#func)*

*Defined in [index.ts:75](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L75)*

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

*Defined in [index.ts:76](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L76)*

___

###  path

• **path**: *string*

*Defined in [index.ts:79](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L79)*

___

###  type

• **type**: *string*

*Inherited from [AppsyncResolverWrapper](#interfacesappsyncresolverwrappermd).[type](#type)*

*Defined in [index.ts:73](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L73)*


<a name="interfacesfieldresolveroutputmd"></a>

[@raydeck/serverless-appsync-builder - v1.0.2](../README.md) › [FieldResolverOutput](#interfacesfieldresolveroutputmd)

# Interface: FieldResolverOutput ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **FieldResolverOutput**

## Index

### Properties

* [appSyncResolver](#appsyncresolver)
* [field](#optional-field)
* [func](#func)
* [type](#optional-type)

## Properties

###  appSyncResolver

• **appSyncResolver**: *string*

*Defined in [index.ts:15](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L15)*

___

### `Optional` field

• **field**? : *undefined | string*

*Defined in [index.ts:13](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L13)*

___

###  func

• **func**: *function*

*Defined in [index.ts:14](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L14)*

#### Type declaration:

▸ (`o`: object): *Promise‹any›*

**Parameters:**

▪ **o**: *object*

Name | Type |
------ | ------ |
`args` | T |

___

### `Optional` type

• **type**? : *undefined | string*

*Defined in [index.ts:12](https://github.com/rhdeck/serverless-appsync-builder/blob/a76f57a/src/index.ts#L12)*
