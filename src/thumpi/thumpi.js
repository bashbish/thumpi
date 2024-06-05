import baseLink from './links.js'
import router from "@/router/index.js";
import jsYaml from 'js-yaml'

const thumpi = {}

thumpi.params = ($route) => {
  try {
    console.log(
      'fullPath',
      $route.fullPath,
      'doci',
      $route.params.doci,
      'pathi',
      $route.params.pathi,
      'opi',
      $route.params.opi,
      'servi',
      $route.params.servi,
      'schemai',
      $route.params.schemai,
      'propi',
      $route.params.propi,
      'responsei',
      $route.params.responsei,
      'contenti',
      $route.params.contenti,
      'parami',
      $route.params.parami,
      'headeri',
      $route.params.headeri,
      'securitySchemei',
      $route.params.securitySchemei
    )
  } catch (e) {
    console.log('error', e)
  }
}
thumpi.isDebug = false

thumpi.debug = (obj) => {
  if (thumpi.isDebug) {
    return obj
  }
  return undefined
}

thumpi.route = (router, link) => {
  if ( thumpi.isDebug) {
    console.log(link)
  }
  router.push(link)
}
// docs

thumpi.getDocs = () => {
  if ( !thumpi.yamls ) {
    thumpi.initDocs();
  }
  return thumpi.yamls
}

thumpi.getDoc = ($route) => {
  return thumpi.getDocs()[$route.params.doci]
}


thumpi.addNewDocByVersion = (version) => {
  thumpi
    .getDocs()
    .push({ openapi: version, info: { title: 'Edit me...', version: '0.0.1' }, paths: {} })
  return thumpi.getDocs().length - 1
}

thumpi.deleteDoc = (docIndex) => {
  console.log('deleteDoc b4', docIndex, thumpi.getDocs().length)
  thumpi.getDocs().splice(docIndex, 1)
  console.log('deleteDoc after', docIndex, thumpi.getDocs().length)
}

// info

thumpi.getInfo = ($route) => {
  if (!Object.hasOwn(thumpi.getDoc($route), 'info')) {
    thumpi.getDoc($route).info = {}
  }
  return thumpi.getDoc($route).info
}

// components

thumpi.getComponents = ($route) => {
  thumpi.params($route)
  if (!thumpi.getDoc($route).hasOwnProperty('components')) {
    console.log('creating components')
    thumpi.getDoc($route)['components'] = {}
  }
  return thumpi.getDoc($route)['components']
}

// paths

thumpi.getPaths = ($route) => {
  if ($route.fullPath.includes('component')) {
    if (!thumpi.getComponents($route).paths) {
      thumpi.getComponents($route).paths = {}
    }
    return thumpi.getComponents($route).paths
  } else {
    if (!thumpi.getDoc($route).paths) {
      thumpi.getDoc($route).paths = {}
    }
    return thumpi.getDoc($route).paths
  }
}

// return path - no create
thumpi.getPath = ($route) => {
  return thumpi.getPaths($route)[decodeURIComponent($route.params.pathi)]
}

thumpi.addPath = ($route, pathname) => {
  if (!pathname || pathname.trim().length === 0) {
    pathname = '/'
  }
  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname
  }
  if (thumpi.getPaths($route).hasOwnProperty(pathname)) {
    throw new Error('path already exists')
  }
  thumpi.getPaths($route)[pathname] = {}
  return thumpi.baseLink($route, 'paths') + '/' + encodeURIComponent(pathname)
}

thumpi.deletePath = ($route, pathName) => {
  const paths = thumpi.getPaths($route)
  delete paths[pathName]
}

thumpi.updatePathName = ($route, name) => {
  if (!name || name.trim().length === 0) {
    throw new Error(`path name value is required.`)
  }
  if (!name.startsWith('/')) {
    name = '/' + name
  }
  const path = thumpi.getPath($route)
  if (!path) {
    throw new Error(`path to update "${decodeURIComponent($route.params.pathi)}" not found.`)
  }
  const paths = thumpi.getPaths($route)
  if (paths.hasOwnProperty(name)) {
    throw new Error(`path "${decodeURIComponent($route.params.pathi)}" already exists.`)
  }
  paths[name] = path
  delete thumpi.getPaths($route)[decodeURIComponent($route.params.pathi)]
  return thumpi.baseLink($route, 'paths') + '/' + encodeURIComponent(name)
}

// operations

thumpi.getOperation = ($route) => {
  const paths = thumpi.getPaths($route)
  const path = paths[decodeURIComponent($route.params.pathi)]
  return path[decodeURIComponent($route.params.opi)]
}

thumpi.addOperation = ($route, operationType) => {
  const path = thumpi.getPath($route)
  if (path[operationType]) {
    throw new Error(`operation "${operationType}" already exists for path.`)
  }
  path[operationType] = {
    operationId: operationType + thumpi.toOperationId(decodeURIComponent($route.params.pathi))
  }
}

thumpi.deleteOperation = ($route, operationType) => {
  const path = thumpi.getPath($route)
  if (!path[operationType]) {
    throw new Error(`path operation "${operationType}" not found.`)
  }
  delete path[operationType]
}

thumpi.addOperationTag = ($route, newTag) => {
  const op = thumpi.getOperation($route)
  if (!op.hasOwnProperty('tags')) {
    op['tags'] = []
  }
  const found = op.tags.find((tag) => tag === newTag)
  if (found) {
    throw new Error(`tag "${newTag}" already added.`)
  }
  op.tags.push(newTag)
}

thumpi.toOperationId = (input) => {
  // Function to capitalize the first letter of a word
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

  // Split the string by '/'
  let parts = input.split('/')

  // Capitalize the first letter of each segment after splitting, except the first if it's empty
  parts = parts.map((part, index) => (index > 0 ? capitalize(part) : part))

  // Join the parts back into a single string without '/'

  if (parts.length > 1 && input.endsWith('}')) {
    parts = parts.slice(parts.length - 2)
  } else {
    parts = parts.slice(parts.length - 1)
  }
  let result = parts.join('')

  // Replace patterns in curly brackets
  result = result.replace(/\{([^}]*)\}/g, (match, p1) => 'By' + capitalize(p1))

  return result
}

thumpi.deleteOperationTag = ($route, idx) => {
  const op = thumpi.getOperation($route)
  op.tags.splice(idx, 1)
}

// parameters

thumpi.addParameter = ($route, param) => {
  if (!param || param.trim() == '') {
    throw Error(`Parameter name required`)
    return
  }
  const params = thumpi.getParameters($route)
  const found = params.find((p) => p.name === param)
  if (found) {
    throw Error(`Parameter '${param}' already defined`)
    return
  }
  params.push({ name: param, in: 'path' })
}

thumpi.deleteParameter = ($route, name) => {
  const params = thumpi.getParameters($route)
  const found = params.findIndex((p) => p.name === name)
  if (found > -1) {
    params.splice(found, 1)
  }
}

// array key:name
thumpi.getParameters = ($route) => {
  if (Object.hasOwn($route.params, 'opi')) {
    if (!Object.hasOwn(thumpi.getOperation($route), 'parameters')) {
      thumpi.getOperation($route)['parameters'] = []
    }
    console.log('get', 'operation', 'parameters', '[]')
    return thumpi.getOperation($route).parameters
  } else if ($route.fullPath.includes('components/parameters')) {
    if (!Object.hasOwn(thumpi.getComponents($route), 'parameters')) {
      thumpi.getComponents($route)['parameters'] = []
    }
    console.log('get', 'components', 'parameters', '[]')
    return thumpi.getComponents($route).parameters
  } else if ($route.params.pathi) {
    if (!thumpi.getPath($route).hasOwnProperty('parameters')) {
      thumpi.getPath($route)['parameters'] = []
    }
    console.log('get', 'path', 'parameters', '[]')
    return thumpi.getPath($route).parameters
  }
}

thumpi.getParameter = ($route) => {
  const found = thumpi
    .getParameters($route)
    .find((p) => p.name === decodeURIComponent($route.params.parami))
  if (!found) {
    throw Error(`Parameter '${$route.params.parami}' not found`)
  }
  console.log('get', 'parameter', $route.params.parami)
  return found
}

thumpi.changeParameterName = ($route, name) => {
  const params = thumpi.getParameters($route)
  if (Object.hasOwn(params, name)) {
    throw new Error(`parameter named '${name}' already exists.`)
  }
  if (Object.hasOwn(params, $route.params.parami)) {
    params[name] = params[$route.params.parami]
    delete params[$route.params.parami]
  } else {
    throw new Error(`Parameter '${$route.params.parami}' not found`)
  }
  return params[$route.params.parami]
}

// external docs

thumpi.getExternalDocs = ($route) => {
  if ($route.params.tagi) {
    if (!thumpi.getTag($route)['externalDocs']) {
      console.log('creating tag.externalDocs')
      thumpi.getTag($route)['externalDocs'] = {}
    }
    return thumpi.getTag($route).externalDocs
  } else {
    if (!thumpi.getDoc($route)['externalDocs']) {
      console.log('creating doc.externalDocs')
      thumpi.getDoc($route)['externalDocs'] = {}
    }
    const docs = thumpi.getDoc($route)['externalDocs']
    console.log('doc.externalDocs', JSON.stringify(docs))
    return docs
  }
}

// contact

thumpi.getContact = ($route) => {
  let contact = thumpi.getDoc($route).info.contact
  if (!contact) {
    thumpi.getDoc($route).info.contact = {}
    contact = thumpi.getDoc($route).info.contact
  }
  return contact
}

// license

thumpi.getLicense = ($route) => {
  let license = thumpi.getDoc($route).info.license
  if (!license) {
    thumpi.getDoc($route).info.license = {}
    license = thumpi.getDoc($route).info.license
  }
  return license
}

// servers

// array key:url
thumpi.getServers = ($route) => {
  if ($route.params.opi) {
    if (!thumpi.getOperation($route)['servers']) {
      thumpi.getOperation($route)['servers'] = []
    }
    return thumpi.getOperation($route).servers
  } else if ($route.params.pathi) {
    if (!thumpi.getPath($route)['servers']) {
      thumpi.getPath($route)['servers'] = []
    }
    return thumpi.getPath($route).servers
  } else {
    if (!thumpi.getDoc($route)['servers']) {
      thumpi.getDoc($route)['servers'] = []
    }
    return thumpi.getDoc($route).servers
  }
}

thumpi.getServer = ($route) => {
  const servers = thumpi.getServers($route)
  const found = servers.find((s) => s.url === decodeURIComponent($route.params.servi))
  if (!found) {
    throw new Error("'" + decodeURIComponent($route.params.servi) + "' not found")
  }
  return servers.find((s) => s.url === decodeURIComponent($route.params.servi))
}

thumpi.addServer = ($route, serverName) => {
  if (!serverName || serverName.trim().length === 0) {
    throw new Error('server name is required')
  }
  if (!(serverName.startsWith('http://') || serverName.startsWith('https://'))) {
    throw new Error("server value needs to start with 'http://' or 'https://'")
  }
  const servers = thumpi.getServers($route)
  const found = servers.find((s) => s.name === serverName)
  if (found) {
    throw new Error('server name already exists')
  }
  servers.push({ url: serverName })
}

thumpi.deleteServer = ($route, idx) => {
  const servers = thumpi.getServers($route)
  servers.splice(idx, 1)
}

thumpi.addServerVariable = ($route, name) => {
  if (!name || name.trim().length === 0) {
    console.log('variable name is required')
    throw new Error('variable name is required')
  }
  if (thumpi.getServerVariables($route).hasOwnProperty(name)) {
    throw new Error('server variable already exists')
  }
  console.log('add variable', name)
  thumpi.getServer($route).variables[name] = {}
}

thumpi.getServerVariables = ($route) => {
  const server = thumpi.getServer($route)
  if (!server.hasOwnProperty('variables')) {
    server['variables'] = {}
  }
  return thumpi.getServer($route).variables
}

thumpi.deleteServerVariable = ($route, svar) => {
  const vars = thumpi.getServerVariables($route)
  delete vars[svar]
}

thumpi.getServerVariable = ($route) => {
  const vars = thumpi.getServerVariables($route)
  return vars[$route.params.svar]
}

thumpi.serverVariableRename = ($route, svar) => {
  if (!svar || svar.trim().length === 0) {
    throw new Error('server variable name is required')
  }
  const vars = thumpi.getServerVariables($route)
  if (vars.hasOwnProperty(svar)) {
    throw new Error('server variable already exists')
  }
  const orig = thumpi.getServerVariable($route)
  vars[svar] = orig
  if (!$route.params.svar) {
    throw new Error('svar not found')
  }
  delete vars[$route.params.svar]
  return vars[svar]
}

// tags

thumpi.getTags = ($route) => {
  const doc = thumpi.getDoc($route)
  if (!Object.hasOwn(doc, 'tags')) {
    doc['tags'] = []
  }
  return doc['tags']
}

thumpi.getTag = ($route) => {
  const tags = thumpi.getTags($route)
  const tag = tags.find((t) => {
    return t.name === $route.params.tagi
  })
  return tag
}

thumpi.addTag = ($route, tag) => {
  const tags = thumpi.getTags($route)
  const found = tags.find((t) => t.name === tag)
  if (found) {
    throw Error(`Tag '${tag}' already exists`)
  }
  tags.push({ name: tag })
}

thumpi.deleteTag = ($route, tag) => {
  const tags = thumpi.getTags($route)
  const idx = tags.findIndex((t) => t.name === tag)
  if (idx > -1) {
    tags.splice(idx, 1)
  }
}

// delete add tag
thumpi.updateTagName = ($route, tagName) => {
  const tags = thumpi.getTags(this.$route)
  const existingIdx = tags.findIndex((t) => t.name === tagName)
  if (existingIdx > -1) {
    throw new Error("can't update tag name because it already exists")
  }
  const origTag = thumpi.getTag(this.$route)
  origTag.name = tagName
  return origTag
}

// security

thumpi.getSecurities = ($route) => {
  if (!thumpi.getDoc($route)['security']) {
    thumpi.getDoc($route)['security'] = []
  }
  return thumpi.getDoc($route).security
}

thumpi.getSecurityRequirement = ($route) => {
  if (!thumpi.getSecurities($route)[$route.params.seci]) {
    //    thumpi.getSecurities($route)[$route.params.seci] = {type:$route.params.seci};
  }
  return thumpi.getSecurities($route)[$route.params.seci]
}

thumpi.addSecurityRequirement = ($route, securityRequirementType) => {
  console.log('adding security requirement type', securityRequirementType)
  const secs = thumpi.getSecurities($route)
  console.log('secs', JSON.stringify(secs))
  const idx = secs.findIndex((o) => {
    //console.log('o',JSON.stringify(o), 'asis', asis, 'key[0]',Object.keys(o)[0]);
    return Object.keys(o)[0] === securityRequirementType + 'Auth'
  })
  if (idx > -1) {
    throw new Error(`Security type ${securityRequirementType}Auth already exists.`)
  }
  const newReq = {}
  newReq[securityRequirementType + 'Auth'] = []
  thumpi.getSecurities($route).push(newReq)
}

thumpi.updateSecurityRequirementName = ($route, asis, tobe) => {
  //console.log('secs name update','asis', asis, 'tobe',tobe);
  const secs = thumpi.getSecurities($route)
  const idx = secs.findIndex((o) => {
    //console.log('o',JSON.stringify(o), 'asis', asis, 'key[0]',Object.keys(o)[0]);
    return Object.keys(o)[0] === asis
  })
  const target = secs[idx]
  secs.splice(idx, 1)
  const replacement = {}
  replacement[tobe] = target[asis]
  secs.splice(idx, 0, replacement)
  //console.log('asis',asis,'tobe', tobe, 'idx',idx,'secs',JSON.stringify(secs), 'target',target);
}

// schema

thumpi.getSchemas = ($route) => {
  if ($route.fullPath.includes('components')) {
    const comp = thumpi.getComponents($route)
    if (!comp['schemas']) {
      console.log('adding schemas')
      comp['schemas'] = {}
    }
    //console.log('components after schema create',JSON.stringify(comp));
    return comp['schemas']
  } else {
    throw Error('fullpath does not contains components: ' + $route.fullPath)
  }
}

// /components/schemas/schemai/properties/:propi
// /components/schemas/:schemai
// /components/parameters/:parami/schema

// /paths/:pathi/operations/:opi/:
// /paths/:pathi/parameters/:parami/schema

thumpi.getSchema = ($route) => {
  if (Object.hasOwn($route.params, 'encodingi')) {
    const encoding = thumpi.getEncoding($route)
    if (!Object.hasOwn(encoding, 'schema')) {
      encoding['schema'] = {}
    }
    return encoding.schema
  } else if (Object.hasOwn($route.params, 'examplei')) {
    const example = thumpi.getExample($route)
    if (!Object.hasOwn(example, 'schema')) {
      example['schema'] = {}
    }
    return example.schema
  }
  if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'parami')) {
    const parameter = thumpi.getParameter($route)
    if (!parameter['schema']) {
      parameter['schema'] = {}
    }
    return parameter.schema
  }
  if (
    !Object.hasOwn($route.params, 'opi') &&
    !$route.fullPath.includes('components/paths') &&
    Object.hasOwn($route.params, 'parami') &&
    Object.hasOwn($route.params, 'pathi')
  ) {
    const parameter = thumpi.getParameter($route)
    if (!parameter['schema']) {
      parameter['schema'] = {}
    }
    return parameter.schema
  } else if (Object.hasOwn($route.params, 'schemai') && Object.hasOwn($route.params, 'propi')) {
    // /components/schemas/:schemai/properties/:propi
    const schemas = thumpi.getSchemas($route)
    if (!Object.hasOwn(schemas, $route.params.schemai)) {
      schemas[$route.params.schemai] = {}
    }
    const schema = schemas[$route.params.schemai]
    if (!schema.hasOwnProperty('properties')) {
      schema['properties'] = {}
    }
    const props = schema['properties']
    if (!props.hasOwnProperty($route.params.propi)) {
      props[$route.params.propi] = {}
    }
    return props[$route.params.propi]
  } else if ($route.fullPath.includes('components/parameters') && $route.params.parami) {
    const param = thumpi.getParameter($route)
    if (!param['schema']) {
      param['schema'] = {}
    }
    return param['schema']
  } else if (Object.hasOwn($route.params, 'headeri')) {
    const header = thumpi.getHeader($route)
    if (!Object.hasOwn(header, 'schema')) {
      header['schema'] = {}
    }
    return header.schema
  } else if (
    Object.hasOwn($route.params, 'pathi') &&
    Object.hasOwn($route.params, 'opi') &&
    $route.fullPath.includes('/requestBody') &&
    Object.hasOwn($route.params, 'contenti')
  ) {
    // /documents/:doci/paths/:pathi/operations/:opi/requestbody/content/:contenti/schema
    const contentItem = thumpi.getContentItem($route)
    if (!Object.hasOwn(contentItem, 'schema')) {
      contentItem['schema'] = {}
    }
    return contentItem.schema
  } else if (
    Object.hasOwn($route.params, 'pathi') &&
    Object.hasOwn($route.params, 'opi') &&
    Object.hasOwn($route.params, 'responsei') &&
    Object.hasOwn($route.params, 'contenti')
  ) {
    // /documents/0/paths/%2Fpet/operations/post/responses/200/content/application%2Fjson/schema
    const contentItem = thumpi.getContentItem($route)
    if (!Object.hasOwn(contentItem, 'schema')) {
      contentItem['schema'] = {}
    }
    return contentItem.schema
  } else if ($route.params.schemai) {
    const schemas = thumpi.getSchemas($route)
    if (!schemas[$route.params.schemai]) {
      schemas[$route.params.schemai] = {}
    }
    return schemas[$route.params.schemai]
  }
}

thumpi.addSchema = ($route, name) => {
  const schemas = thumpi.getSchemas($route)
  if (schemas[name]) {
    throw new Error("Schema '" + name + "' already exists")
  }
  schemas[name] = {}
  console.log('schema added', name, JSON.stringify(thumpi.getSchemas($route)))
}

thumpi.deleteSchema = ($route, name) => {
  const schemas = thumpi.getSchemas($route)
  delete schemas[name]
}

thumpi.changeSchemaName = ($route, name) => {
  if ($route.params.opi && $route.params.parami) {
    const parameter = thumpi.getParameter($route)
    if (!parameter['schema']) {
      parameter['schema'] = {}
    }
    // noop
  } else {
    const schemas = thumpi.getSchemas($route)
    if (Object.hasOwn(schemas, name)) {
      throw new Error(`schema element '${name}' already exists.`)
    }
    if (Object.hasOwn(schemas, $route.params.schemai)) {
      schemas[name] = schemas[$route.params.schemai]
      delete schemas[$route.params.schemai]
    }
    return schemas[$route.params.schemai]
  }
}

thumpi.addSchemaRequired = ($route, name) => {
  if (!name || name.trim().length === 0) {
    throw new Error('A value is required')
  }
  const schema = thumpi.getSchema($route)
  if (!schema['required'] || !Array.isArray(schema.required)) {
    schema.required = []
  }
  const found = schema.required.findIndex((item) => item === name)
  if (found > -1) {
    throw new Error('required value already exists')
  }
  schema.required.push(name)
}

thumpi.deleteSchemaRequired = ($route, name) => {
  if (!name || name.trim().length === 0) {
    throw new Error('A value is required')
  }
  const schema = thumpi.getSchema($route)
  if (!schema['required'] || !Array.isArray(schema.required)) {
    schema.required = []
  }
  const found = schema.required.findIndex((item) => item === name)
  if (found > -1) {
    schema.required.splice(found, 1)
  }
}

thumpi.addSchemaEnum = ($route, name) => {
  if (!name || name.trim().length === 0) {
    throw new Error('A value is required')
  }
  const schema = thumpi.getSchema($route)
  if (!schema['enum'] || !Array.isArray(schema.enum)) {
    schema.enum = []
  }
  const found = schema.enum.findIndex((item) => item === name)
  if (found > -1) {
    throw new Error('enum value already exists')
  }
  schema.enum.push(name)
}

thumpi.deleteSchemaEnum = ($route, name) => {
  if (!name || name.trim().length === 0) {
    throw new Error('A value is required')
  }
  const schema = thumpi.getSchema($route)
  if (!schema['enum'] || !Array.isArray(schema.enum)) {
    schema.enum = []
  }
  const found = schema.enum.findIndex((item) => item === name)
  if (found > -1) {
    schema.enum.splice(found, 1)
  }
}

thumpi.onSchemaTypeUpdate = ($route, schemaFields, schemaType) => {
  const schema = thumpi.getSchema($route)
  if (schemaType === 'array') {
    if (!schema.hasOwnProperty('items')) {
      schema['items'] = { type: undefined }
    }
  } else if (!schema.hasOwnProperty('type')) {
    // not array
    delete schema['items']
  }
}

thumpi.schemaFields = (keys) => {
  // https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#page-6
  const fields = {
    $ref: {
      enabled: false,
      help: 'Reference a schema using format #/components/schemas/<SchemaName>'
    },
    type: {
      enabled: true,
      help: 'Value MUST be a string. Multiple types via an array are not supported.'
    },
    format: {
      enabled: false,
      help:
        'See Data Type Formats for further details. While relying on JSON Schema’s defined formats, the OAS offers a few additional predefined formats. date-time: RFC 3339, section 5.6, email: RFC 5322, section 3.4.1, hostname:  RFC 1034,\n' +
        '   section 3.1, ipv4:  RFC 2673, section 3.2, ipv6: RFC 2373, section 2.2, uri:  RFC 3986, uriref: RFC 3986, Custom: RFC or other'
    },

    properties: {
      enabled: false,
      help: 'Property definitions MUST be a Schema Object and not a standard JSON Schema (inline or referenced).',
      cat: 'object'
    },
    items: {
      enabled: false,
      help: 'Value MUST be an object and not an array. Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema. items MUST be present if the type is array.',
      cat: 'array'
    },
    additionalProperties: {
      enabled: false,
      help: 'Value can be boolean or object. Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.'
    },
    allOf: {
      enabled: false,
      help: 'Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema. An array of object values'
    },
    anyOf: {
      enabled: false,
      help: 'Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema. An array of object values'
    },
    default: {
      enabled: false,
      help: 'The default value represents what would be assumed by the consumer of the input as the value of the schema if one is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at the same level. For example, if type is string, then default can be "foo" but cannot be 1.',
      cat: 'metadata'
    },
    deprecated: {
      enabled: false,
      help: 'Signal the schema property will be removed in the future'
    },
    description: {
      enabled: false,
      help: 'CommonMark syntax MAY be used for rich text representation.',
      cat: 'metadata'
    },
    discriminator: {
      enabled: false,
      help: 'Discriminator Object Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description. See Composition and Inheritance for more details.'
    },
    enum: { enabled: false, help: 'An array of valid values' },
    example: {
      enabled: false,
      help: 'Any A free-form property to include an example of an instance for this schema. To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.'
    },
    exclusiveMaximum: {
      enabled: false,
      help: 'true: value can not equal maximum value > versus >=',
      cat: 'number'
    },
    exclusiveMinimum: {
      enabled: false,
      help: 'true: value can not equal minimum value < versus <= ',
      cat: 'number'
    },
    externalDocs: {
      enabled: false,
      help: 'External Documentation Object Additional external documentation for this schema.'
    },

    maxItems: { enabled: false, cat: 'array' },
    maxLength: { enabled: false, help: 'integer value' },
    maxProperties: { enabled: false, help: 'maximum number of properties in an object instance' },
    maximum: { enabled: false, help: 'upper limit of number', cat: 'number' },
    minItems: { enabled: false, cat: 'array' },
    minLength: { enabled: false },
    minProperties: { enabled: false, help: 'minimum number of properties in an object instance' },
    minimum: { enabled: false, help: 'lower limit of number', cat: 'number' },
    multipleOf: {
      enabled: false,
      help: 'Validation, numeric integer value that when divided by multipleof mods to zero',
      cat: 'number'
    },
    not: {
      enabled: false,
      help: 'Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema. An object that fails validation of it'
    },
    nullable: {
      enabled: false,
      help: 'boolean Allows sending a null value for the defined schema. Default value is false.'
    },
    oneOf: {
      enabled: false,
      help: 'Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema. An array of object values'
    },
    pattern: { enabled: false, help: 'ECMA 262 regular expression dialect' },

    readOnly: {
      enabled: false,
      help: 'boolean Relevant only for Schema "properties" definitions. Declares the property as “read only”. This means that it MAY be sent as part of a response but SHOULD NOT be sent as part of the request. If the property is marked as readOnly being true and is in the required list, the required will take effect on the response only. A property MUST NOT be marked as both readOnly and writeOnly being true. Default value is false.'
    },
    required: { enabled: false, help: 'true/false, default: false' },
    title: { enabled: false, help: 'Schema presentation metadata', cat: 'metadata' },
    uniqueItems: { enabled: false, help: 'boolean value', cat: 'array' },
    writeOnly: {
      enabled: false,
      help: 'boolean Relevant only for Schema "properties" definitions. Declares the property as “write only”. Therefore, it MAY be sent as part of a request but SHOULD NOT be sent as part of the response. If the property is marked as writeOnly being true and is in the required list, the required will take effect on the request only. A property MUST NOT be marked as both readOnly and writeOnly being true. Default value is false.'
    },
    xml: {
      enabled: false,
      help: 'XML Object This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional metadata to describe the XML representation of this property.'
    }
  }

  keys.forEach((key) => {
    switch (key) {
      case '$ref':
        fields['$ref'].enabled = true
        break
      case 'type':
        fields['type'].enabled = true
        break
      case 'format':
        fields['format'].enabled = true
        break
      case 'items':
        fields['items'].enabled = true
        break
      case 'required':
        fields['required'].enabled = true
        break
      case 'properties':
        fields['properties'].enabled = true
        break
      case 'nullable':
        fields['nullable'].enabled = true
        break
      case 'title':
        fields['title'].enabled = true
        break
      case 'multipleOf':
        fields['multipleOf'].enabled = true
        break
      case 'maximum':
        fields['maximum'].enabled = true
        break
      case 'exclusiveMaximum':
        fields['exclusiveMaximum'].enabled = true
        break
      case 'minimum':
        fields['minimum'].enabled = true
        break
      case 'exclusiveMinimum':
        fields['exclusiveMinimum'].enabled = true
        break
      case 'maxLength':
        fields['maxLength'].enabled = true
        break
      case 'minLength':
        fields['minLength'].enabled = true
        break
      case 'pattern':
        fields['pattern'].enabled = true
        break
      case 'maxItems':
        fields['maxItems'].enabled = true
        break
      case 'minItems':
        fields['minItems'].enabled = true
        break
      case 'uniqueItems':
        fields['uniqueItems'].enabled = true
        break
      case 'maxProperties':
        fields['maxProperties'].enabled = true
        break
      case 'minProperties':
        fields['minProperties'].enabled = true
        break
      case 'enum':
        fields['enum'].enabled = true
        break
      case 'allOf':
        fields['allOf'].enabled = true
        break
      case 'oneOf':
        fields['oneOf'].enabled = true
        break
      case 'anyOf':
        fields['anyOf'].enabled = true
        break
      case 'not':
        fields['not'].enabled = true
        break
      case 'additionalProperties':
        fields['additionalProperties'].enabled = true
        break
      case 'description':
        fields['description'].enabled = true
        break
      case 'default':
        fields['default'].enabled = true
        break
      case 'discriminator':
        fields['discriminator'].enabled = true
        break
      case 'readOnly':
        fields['readOnly'].enabled = true
        break
      case 'writeOnly':
        fields['writeOnly'].enabled = true
        break
      case 'xml':
        fields['xml'].enabled = true
        break
      case 'externalDocs':
        fields['externalDocs'].enabled = true
        break
      case 'example':
        fields['example'].enabled = true
        break
      case 'deprecated':
        fields['deprecated'].enabled = true
        break
    }
  })

  return fields
}

// property

thumpi.getProperties = ($route) => {
  // /components/schemas/:schemai/properties
  if ($route.fullPath.includes('components')) {
    const schema = thumpi.getSchema($route)
    if (!schema['properties']) {
      schema['properties'] = {}
    }
    return schema.properties
  }
}

thumpi.getProperty = ($route) => {
  // /components/schemas/:schemai/properties/:propi
  if ($route.params.schemai && $route.params.propi) {
    const properties = thumpi.getProperties($route)
    if (!properties[$route.params.propi]) {
      properties[$route.params.propi] = {}
    }
    return properties[$route.params.propi]
  } else if ($route.fullPath.includes('components') && $route.params.schemai) {
    const properties = thumpi.getProperties($route)
    if (!properties.hasOwnProperty($route.params.schemai)) {
      properties[$route.params.schemai] = {}
    }
    return properties[$route.params.schemai]
  }
}

thumpi.addProperty = ($route, name) => {
  if (!name || name.trim().length === 0) {
    throw new Error('a property value is required')
  }
  const properties = thumpi.getProperties($route)
  if (properties[name]) {
    throw new Error("property '" + name + "' already exists")
  }
  properties[name] = {}
}

thumpi.deleteProperty = ($route, name) => {
  const properties = thumpi.getProperties($route)
  delete properties[name]
}

//   response

// /documents/:doci/path/:pathi/operations/:opi/responses
// /documents/:doci/components/responses
thumpi.getResponses = ($route) => {
  if (Object.hasOwn($route.params, 'opi')) {
    const operation = thumpi.getOperation($route)
    if (!operation['responses']) {
      operation['responses'] = {}
    }
    return operation.responses
  }
  if ($route.fullPath.includes('components/responses')) {
    const comps = thumpi.getComponents($route)
    if (!comps['responses']) {
      comps['responses'] = {}
    }
    return comps.responses
  }
}

thumpi.getResponse = ($route) => {
  const responses = thumpi.getResponses($route)
  if ($route.params.responsei) {
    if (!responses[$route.params.responsei]) {
      responses[$route.params.responsei] = {}
    }
    return responses[$route.params.responsei]
  }
}

// documents/0/path/:pathi/operations/:opi/responses/
thumpi.addResponse = ($route, name) => {
  if ($route.params.opi) {
    const httpCodePattern = /^(100|[1-5][0-9]{2})$/
    if (!(name === '$ref' || name === 'default' || httpCodePattern.test(name))) {
      throw new Error(
        "Response '" + name + "' is not a valid HTTP code like [200, 404, 500...] or 'default'"
      )
    }
  }
  const responses = thumpi.getResponses($route)
  if (responses[name]) {
    throw new Error("Response '" + name + "' already exists")
  }
  responses[name] = {}
}

thumpi.deleteResponse = ($route, name) => {
  const responses = thumpi.getResponses($route)
  delete responses[name]
}

//   headers

thumpi.getHeaders = ($route) => {
  if ($route.fullPath.includes('components/headers')) {
    const comps = thumpi.getComponents($route)
    if (!Object.hasOwn(comps, 'headers')) {
      comps['headers'] = {}
    }
    return comps.headers
  } else if (Object.hasOwn($route.params, 'encodingi')) {
    const encoding = thumpi.getEncoding($route)
    if (!Object.hasOwn(encoding, 'headers')) {
      encoding['headers'] = {}
    }
    return encoding.headers
  }
}

thumpi.getHeader = ($route) => {
  const headers = thumpi.getHeaders($route)
  if (!Object.hasOwn(headers, $route.params.headeri)) {
    headers[$route.params.headeri] = {}
  }
  return headers[$route.params.headeri]
}

thumpi.addHeader = ($route, name) => {
  if (!name || name.trim().length === 0) {
    throw new Error('a header value is required')
  }
  const headers = thumpi.getHeaders($route)
  if (Object.hasOwn(headers, name)) {
    throw new Error("Header '" + name + "' already exists")
  }
  headers[name] = {}
}

thumpi.deleteHeader = ($route, name) => {
  const headers = thumpi.getHeaders($route)
  delete headers[name]
}

thumpi.changeHeaderName = ($route, name) => {
  const headers = thumpi.getHeaders($route)
  if (Object.hasOwn(headers, name)) {
    throw new Error(`header named '${name}' already exists.`)
  }
  if (Object.hasOwn(headers, $route.params.headeri)) {
    headers[name] = headers[$route.params.headeri]
    delete headers[$route.params.headeri]
  } else {
    throw new Error(`header '${$route.params.headeri}' not found`)
  }
}

// requestBodies

thumpi.getRequestBodies = ($route) => {
  const components = thumpi.getComponents($route)
  if (!Object.hasOwn(components, 'requestBodies')) {
    components['requestBodies'] = {}
  }
  return components.requestBodies
}

thumpi.getRequestBody = ($route) => {
  if ($route.fullPath.includes('components/requestBodies')) {
    const requestBodies = thumpi.getRequestBodies($route)
    if (!Object.hasOwn(requestBodies, $route.params.requestbodyi)) {
      requestBodies[$route.params.requestbodyi] = {}
    }
    return requestBodies[$route.params.requestbodyi]
  } else {
    const operation = thumpi.getOperation($route)
    if (!operation['requestBody']) {
      operation['requestBody'] = {}
    }
    return operation.requestBody
  }
}

thumpi.getRequestBodyType = ($route) => {
  const operation = thumpi.getRequestBody($route)
  return thumpi.getType(operation.requestBody)
}

thumpi.getType = (value) => {
  if (typeof value === 'undefined') {
    return 'undefined'
  } else if (typeof value === 'string') {
    return 'string'
  } else if (typeof value === 'object') {
    if (value === null) {
      return 'null'
    } else if (Array.isArray(value)) {
      return 'array'
    } else {
      return 'object'
    }
  } else if (typeof value === 'number') {
    return 'number'
  } else if (typeof value === 'boolean') {
    return 'boolean'
  } else if (typeof value === 'function') {
    return 'function'
  } else {
    return 'unknown'
  }
}

//   content

// map
thumpi.getContent = ($route) => {
  // plural
  if (
    $route.fullPath.includes('components/responses') &&
    Object.hasOwn($route.params, 'responsei')
  ) {
    const resp = thumpi.getResponse($route)
    if (!Object.hasOwn(resp, 'content')) {
      resp['content'] = {}
    }
    return resp.content
  } else if (
    Object.hasOwn($route.params, 'pathi') &&
    Object.hasOwn($route.params, 'opi') &&
    $route.fullPath.includes('/requestBody')
  ) {
    const requestBody = thumpi.getRequestBody($route)
    if (!Object.hasOwn(requestBody, 'content')) {
      requestBody['content'] = {}
    }
    return requestBody.content
  } else if (
    Object.hasOwn($route.params, 'pathi') &&
    Object.hasOwn($route.params, 'opi') &&
    Object.hasOwn($route.params, 'responsei')
  ) {
    // documents/0/paths/%2Fpet/operations/post/responses/200/content/application%2Fjson
    const resp = thumpi.getResponse($route)
    if (!Object.hasOwn(resp, 'content')) {
      resp['content'] = {}
    }
    return resp.content
  } else if (Object.hasOwn($route.params, 'opi')) {
    const operation = thumpi.getOperation($route)
    if (!Object.hasOwn(operation, 'content')) {
      operation['content'] = {}
    }
    return operation.content
  }
}

thumpi.getContentItem = ($route) => {
  const content = thumpi.getContent($route)
  if (!content[decodeURIComponent($route.params.contenti)]) {
    content[decodeURIComponent($route.params.contenti)] = {}
  }
  return content[decodeURIComponent($route.params.contenti)]
}

thumpi.addContentItem = ($route, name) => {
  const content = thumpi.getContent($route)
  if (Object.hasOwn(content, name)) {
    throw new Error("Content item '" + name + "' already exists")
  }
  content[name] = {}
}

thumpi.deleteContentItem = ($route, name) => {
  const content = thumpi.getContent($route)
  delete content[decodeURIComponent(name)]
}

// encoding

thumpi.getEncodings = ($route) => {
  const contentItem = thumpi.getContentItem($route)

  // /documents/:doci/paths/:pathi/operations/:opi/requestbody/content/:contenti/encoding/:encodingi
  if (!Object.hasOwn(contentItem, 'encoding')) {
    contentItem['encoding'] = {}
  }
  return contentItem.encoding
}

thumpi.getEncoding = ($route) => {
  const encodings = thumpi.getEncodings($route)

  if (!Object.hasOwn(encodings, decodeURIComponent($route.params.encodingi))) {
    encodings[decodeURIComponent($route.params.encodingi)] = {}
  }
  return encodings[decodeURIComponent($route.params.encodingi)]
}

thumpi.addEncoding = ($route, name) => {
  const encodings = thumpi.getEncodings($route)
  if (Object.hasOwn(encodings, name)) {
    throw new Error("Encoding '" + name + "' already exists")
  }
  encodings[name] = {}
}

thumpi.deleteEncoding = ($route, name) => {
  thumpi.params($route)
  const encodings = thumpi.getEncodings($route)
  console.log('thumpi.deleteEncoding', name, JSON.stringify(encodings))
  delete encodings[name]
}

thumpi.changeEncodingName = ($route, name) => {
  const encodings = thumpi.getEncodings($route)
  if (Object.hasOwn(encodings, name)) {
    throw new Error(`encoding named '${name}' already exists.`)
  }
  if (Object.hasOwn(encodings, $route.params.encodingi)) {
    encodings[name] = encodings[$route.params.encodingi]
    delete encodings[$route.params.encodingi]
  } else {
    throw new Error(`encoding '${$route.params.encodingi}' not found`)
  }
}

// examples

thumpi.getExamples = ($route) => {
  thumpi.params($route)
  if ($route.fullPath.includes('/components/examples')) {
    const comps = thumpi.getComponents($route)
    if (!Object.hasOwn(comps, 'examples')) {
      comps['examples'] = {}
    }
    return comps.examples
  } else if (Object.hasOwn($route.params, 'contenti')) {
    const contentItem = thumpi.getContentItem($route)
    if (!Object.hasOwn(contentItem, 'examples')) {
      contentItem['examples'] = {}
    }
    return contentItem['examples']
  }
}

thumpi.getExample = ($route) => {
  if (Object.hasOwn($route.params, 'contenti')) {
    const examples = thumpi.getExamples($route)
    if (!Object.hasOwn(examples, $route.params.examplei)) {
      examples[$route.params.examplei] = {}
    }
    return examples[$route.params.examplei]
  } else if ($route.fullPath.includes('/components/examples/')) {
    const examples = thumpi.getExamples($route)
    if (!Object.hasOwn(examples, $route.params.examplei)) {
      examples[$route.params.examplei] = {}
    }
    return examples[$route.params.examplei]
  }
}

thumpi.addExample = ($route, name) => {
  const examples = thumpi.getExamples($route)
  console.log('addExample', 'examples', examples)
  if (Object.hasOwn(examples, name)) {
    throw new Error("Example '" + name + "' already exists")
  }
  examples[name] = {}
}

thumpi.deleteExample = ($route, name) => {
  const examples = thumpi.getExamples($route)
  delete examples[name]
}

thumpi.changeExampleName = ($route, name) => {
  const examples = thumpi.getExamples($route)
  if (Object.hasOwn(examples, name)) {
    throw new Error(`example named '${name}' already exists.`)
  }
  if (Object.hasOwn(examples, $route.params.examplei)) {
    examples[name] = examples[$route.params.examplei]
    delete examples[$route.params.examplei]
  } else {
    throw new Error(`Example '${$route.params.examplei}' not found`)
  }
}

// security schemes

thumpi.getSecuritySchemes = ($route) => {
  const components = thumpi.getComponents($route)
  if (!Object.hasOwn(components, 'securitySchemes')) {
    components['securitySchemes'] = {}
  }
  return components.securitySchemes
}

thumpi.getSecurityScheme = ($route) => {
  const schemes = thumpi.getSecuritySchemes($route)
  if (!Object.hasOwn(schemes, $route.params.securitySchemei)) {
    schemes[$route.params.securitySchemei] = {}
  }
  return schemes[$route.params.securitySchemei]
}

thumpi.changeSecuritySchemeName = ($route, name) => {
  const schemes = thumpi.getSecuritySchemes($route)
  if (Object.hasOwn(schemes, name)) {
    throw new Error(`security scheme named '${name}' already exists.`)
  }
  if (Object.hasOwn(schemes, $route.params.securitySchemei)) {
    schemes[name] = schemes[$route.params.securitySchemei]
    delete schemes[$route.params.securitySchemei]
  } else {
    throw new Error(`security scheme '${$route.params.securitySchemei}' not found`)
  }
}

thumpi.saveDocs = () => {
  console.log('saveDocs')
  if ( !thumpi.yamls ) {
    thumpi.yamls = [];
  }
  for ( let i = 0; i > thumpi.yamls.length; i++){
    localStorage.setItem('doc'+i, jsYaml.dump(thumpi.yamls.at(i)));
  }
}

thumpi.loadDocs = () => {
  if ( !thumpi.yamls) {
    thumpi.yamls = [];
  }
  /*if ( Object.hasOwn(localStorage, 'doc0') ) {
    thumpi.yamls.push(jsYaml.load(localStorage.getItem('doc0'))) ;
  }
  if ( Object.hasOwn(localStorage, 'doc1') ) {
    thumpi.yamls.push(jsYaml.load(localStorage.getItem('doc1'))) ;
  }
  if ( Object.hasOwn(localStorage, 'doc2') ) {
    thumpi.yamls.push(jsYaml.load(localStorage.getItem('doc2'))) ;
  }
  if ( Object.hasOwn(localStorage, 'doc3') ) {
    thumpi.yamls.push(jsYaml.load(localStorage.getItem('doc3'))) ;
  }
  if ( Object.hasOwn(localStorage, 'doc4') ) {
    thumpi.yamls.push(jsYaml.load(localStorage.getItem('doc4'))) ;
  } */
}

thumpi.initDocs = () => {
  if ( !thumpi.yamls) {
    thumpi.loadDocs();
  }
}

thumpi.loadSamples = () => {
  const basePath = document.querySelector('base').getAttribute('href');
  return fetchYaml(basePath + 'samples/petstore.yaml', thumpi)
}

const fetchYaml = async function (path) {
  console.log('getting', path)
  return fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText)
        }
        return response.text()
      })
      .then((data) => thumpi.importDoc(jsYaml.load(data)))
      .catch((error) => console.error('There was a problem with the fetch operation:', error))
}

thumpi.importDoc = (doc) => {
  console.log('import doc');
  if ( doc ) {
    thumpi.getDocs().push(doc);
    thumpi.saveDocs();
    if ( thumpi.isDebug ) {
      console.log('document added');
    }
  } else {
    if ( thumpi.isDebug ) {
      console.log('document not added');
    }
  }
  if ( thumpi.isDebug ) {
    console.log('docs after import:',thumpi.getDocs().length);
  }
}



// constructor

thumpi.baseLink = baseLink

const createThumpi = () => {
  thumpi.yamls = thumpi.loadDocs()
  return thumpi
}

export default createThumpi()
