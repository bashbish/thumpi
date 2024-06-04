<script setup>
import ThumpiHeader from './thumpiheader.vue'
import ThumpiItem from './thumpiitem.js'
import { useRoute, useRouter } from 'vue-router'
import { ref, inject } from 'vue'

const route = useRoute()
const router = useRouter()
defineEmits(['document'])
const $thumpi = inject('$thumpi')

const toLink = (link) => {
  console.log(link)
  router.push(link)
}

const doc = ref($thumpi.getDoc(route))
const upLink = ref($thumpi.baseLink(route, 'documents'))
const label = ref('Document')
</script>

<template>
  <thumpi-header :label="label" @back="toLink(upLink)"></thumpi-header>

  <div class="mb-3 mt-3">
    <label for="openapiVersion" class="form-label">OpenAPI Specification Version</label>
    <select
      class="form-select"
      id="openapiVersion"
      aria-label="OpenAPi Version"
      v-model="doc.openapi"
    >
      <option value="3.1.0">3.1.0</option>
      <option value="3.0.3">3.0.3</option>
      <option value="3.0.0">3.0.0</option>
    </select>
  </div>

  <div class="mb-3" v-if="doc.openapi === '3.1.0'">
    <label for="docSchemaDialect" class="form-label">Schema Dialect URI</label>
    <input
      class="form-control"
      id="docSchemaDialect"
      type="text"
      aria-label="schema dialect uri"
      v-model="doc.jsonSchemaDialect"
    />
  </div>

  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <thumpi-item
        :label="'Info'"
        :toLink="$thumpi.baseLink($route, 'info')"
        @toLink="toLink"
      ></thumpi-item>
    </li>
    <li class="list-group-item">
      <thumpi-item
        :label="'Servers'"
        :toLink="$thumpi.baseLink($route, 'servers')"
        @toLink="toLink"
        :action="'plus'"
      ></thumpi-item>
    </li>
    <li class="list-group-item">
      <thumpi-item
        :label="'Paths'"
        :toLink="$thumpi.baseLink($route, 'paths')"
        @toLink="toLink"
        :action="'plus'"
      ></thumpi-item>
    </li>
    <li class="list-group-item">
      <thumpi-item
        :label="'Components'"
        :toLink="$thumpi.baseLink($route, 'components')"
        @toLink="toLink"
        :action="'plus'"
      ></thumpi-item>
    </li>
    <li class="list-group-item">
      <thumpi-item
        :label="'Security'"
        :toLink="$thumpi.baseLink($route, 'security')"
        @toLink="toLink"
      ></thumpi-item>
    </li>
    <li class="list-group-item">
      <thumpi-item
        :label="'Tags'"
        :toLink="$thumpi.baseLink($route, 'tags')"
        @toLink="toLink"
      ></thumpi-item>
    </li>
    <li class="list-group-item">
      <thumpi-item
        :label="'External Documents'"
        :toLink="$thumpi.baseLink($route, 'externaldocs')"
        @toLink="toLink"
      ></thumpi-item>
    </li>
    <li class="list-group-item" v-show="doc.openapi === '3.1.0'">
      <thumpi-item
        :label="'Webhooks'"
        :toLink="$thumpi.baseLink($route, 'webhooks')"
        @toLink="toLink"
        :action="'plus'"
      ></thumpi-item>
    </li>
  </ul>
</template>
