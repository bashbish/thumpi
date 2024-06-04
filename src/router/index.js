import { createRouter, createWebHistory } from 'vue-router'

import OADocuments from '../components/documents.vue'
import OADocument from '../components/document.vue'
import OpenAPI from '../components/openapi.vue'
import Servers from '../components/servers.js'
import Paths from '../components/paths.js'
import Webhooks from '../components/webhooks.js'
import Components from '../components/components.js'
import Securities from '../components/securities.js'
import Security from '../components/security.js'
import SecurityRequirement from '../components/securityrequirement.js'
import Tags from '../components/tags.js'
import Tag from '../components/tag.js'
import ExternalDoc from '../components/externaldoc.js'
import Links from '../components/links.js'
import Info from '../components/info.vue'
import Contact from '../components/contact.js'
import License from '../components/license.js'
import Server from '../components/server.js'
import ServerVariable from '../components/servervariable.js'
import Path from '../components/path.js'
import Operation from '../components/operation.js'
import Operations from '../components/operations.js'
import Yaml from '../components/yaml.js'
import Parameters from '../components/parameters.js'
import Parameter from '../components/parameter.js'
import Schemas from '../components/schemas.js'
import Schema from '../components/schema.js'
import Example from '../components/example.js'
import Responses from '../components/responses.js'
import Response from '../components/response.js'
import Examples from '../components/examples.js'
import RequestBodies from '../components/requestbodies.js'
import Headers from '../components/headers.js'
import Header from '../components/header.js'
import SecuritySchemes from '../components/securityschemes.js'
import SecurityScheme from '../components/securityscheme.js'
import Callbacks from '../components/callbacks.js'
import About from '../components/about.vue'
import RequestBody from '../components/requestbody.js'
import Content from '../components/content.js'
import ContentItem from '../components/contentitem.js'
import Encoding from '../components/encoding.js'

const routes = [
  { path: '/documents', component: OADocuments },
  { path: '/', component: OpenAPI },
  { path: '/about', component: About },
  { path: '/documents/:doci', component: OADocument },
  { path: '/documents/:doci/servers', component: Servers },
  { path: '/documents/:doci/servers/:servi', component: Server },
  { path: '/documents/:doci/servers/:servi/variables/:svar', component: ServerVariable },
  { path: '/documents/:doci/webhooks', component: Webhooks },
  { path: '/documents/:doci/components', component: Components },
  { path: '/documents/:doci/security', component: Securities },
  { path: '/documents/:doci/security/:seci', component: SecurityRequirement },
  { path: '/documents/:doci/tags', component: Tags },
  { path: '/documents/:doci/tags/:tagi', component: Tag },
  { path: '/documents/:doci/tags/:tagi/externaldocs', component: ExternalDoc },
  { path: '/documents/:doci/externaldocs', component: ExternalDoc },
  { path: '/documents/:doci/links', component: Links },
  { path: '/documents/:doci/info', component: Info },
  { path: '/documents/:doci/info/contact', component: Contact },
  { path: '/documents/:doci/info/license', component: License },
  { path: '/documents/:doci/paths', component: Paths },
  { path: '/documents/:doci/paths/:pathi', component: Path },
  { path: '/documents/:doci/paths/:pathi/servers', component: Servers },
  { path: '/documents/:doci/paths/:pathi/servers/:servi', component: Server },
  { path: '/documents/:doci/paths/:pathi/parameters', component: Parameters },
  { path: '/documents/:doci/paths/:pathi/parameters/:parami', component: Parameter },
  { path: '/documents/:doci/paths/:pathi/parameters/:parami/schema', component: Schema },
  { path: '/documents/:doci/paths/:pathi/operations', component: Operations },
  { path: '/documents/:doci/paths/:pathi/operations/:opi', component: Operation },
  { path: '/documents/:doci/paths/:pathi/operations/:opi/parameters', component: Parameters },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/parameters/:parami',
    component: Parameter
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/parameters/:parami/schema',
    component: Schema
  },
  { path: '/documents/:doci/paths/:pathi/operations/:opi/requestbody', component: RequestBody },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/requestbody/content/:contenti',
    component: ContentItem
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/requestbody/content/:contenti/examples/:examplei',
    component: Example
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/requestbody/content/:contenti/schema',
    component: Schema
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/requestbody/content/:contenti/encoding/:encodingi',
    component: Encoding
  },
  { path: '/documents/:doci/paths/:pathi/operations/:opi/responses', component: Responses },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei',
    component: Response
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei/content',
    component: Content
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei/content/:contenti',
    component: ContentItem
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei/content/:contenti/schema',
    component: Schema
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei/content/:contenti/encoding/:encodingi',
    component: Encoding
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei/content/:contenti/encoding/:encodingi/headers/:headeri',
    component: Header
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei/content/:contenti/encoding/:encodingi/headers/:headeri/schema',
    component: Schema
  },
  {
    path: '/documents/:doci/paths/:pathi/operations/:opi/responses/:responsei/links',
    component: Links
  },
  { path: '/documents/:doci/paths/:pathi/operations/:opi/callbacks', component: Callbacks },
  { path: '/documents/:doci/paths/:pathi/operations/:opi/security', component: Security },
  { path: '/documents/:doci/paths/:pathi/operations/:opi/servers', component: Servers },
  { path: '/documents/:doci/paths/:pathi/operations/:opi/externaldocs', component: ExternalDoc },
  { path: '/documents/:doci/components/schemas', component: Schemas },
  { path: '/documents/:doci/components/schemas/:schemai', component: Schema },
  { path: '/documents/:doci/components/schemas/:schemai/properties/:propi', component: Schema },
  { path: '/documents/:doci/components/responses', component: Responses },
  { path: '/documents/:doci/components/responses/:responsei', component: Response },
  {
    path: '/documents/:doci/components/responses/:responsei/content/:contenti',
    component: ContentItem
  },
  {
    path: '/documents/:doci/components/responses/:responsei/content/:contenti/examples/:examplei',
    component: Example
  },
  {
    path: '/documents/:doci/components/responses/:responsei/content/:contenti/examples/:examplei/schema',
    component: Schema
  },
  { path: '/documents/:doci/components/headers', component: Headers },
  { path: '/documents/:doci/components/headers/:headeri', component: Header },
  { path: '/documents/:doci/components/headers/:headeri/schema', component: Schema },
  { path: '/documents/:doci/components/parameters', component: Parameters },
  { path: '/documents/:doci/components/parameters/:parami', component: Parameter },
  { path: '/documents/:doci/components/parameters/:parami/schema', component: Schema },
  { path: '/documents/:doci/components/examples', component: Examples },
  { path: '/documents/:doci/components/examples/:examplei', component: Example },
  { path: '/documents/:doci/components/requestBodies', component: RequestBodies },
  { path: '/documents/:doci/components/requestBodies/:requestbodyi', component: RequestBody },
  { path: '/documents/:doci/components/securitySchemes', component: SecuritySchemes },
  {
    path: '/documents/:doci/components/securitySchemes/:securitySchemei:',
    component: SecurityScheme
  },
  { path: '/documents/:doci/components/links', component: Links },
  { path: '/documents/:doci/components/callbacks', component: Callbacks },
  { path: '/documents/:doci/components/paths', component: Paths },
  { path: '/yaml', component: Yaml },
  { path: '/documents/:doci/yaml', component: Yaml }
]

const router = createRouter({
  //history: createMemoryHistory(),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
