<script setup>
import Plus from './icons/plus.vue'
import Edit from './icons/edit.vue'
import ThumpiHeader from './thumpiheader.vue'
import { useRoute, useRouter } from 'vue-router'

import { ref, inject } from 'vue'

const router = useRouter()
const route = useRoute()
const $thumpi = inject('$thumpi')

const toLink = (link) => {
  console.log(link)
  router.push(link)
}

const info = ref($thumpi.getInfo(route))
const label = ref('Info')
const upLink = ref($thumpi.baseLink(route, 'document'))
const downLink = ref($thumpi.baseLink(route, 'document'))
</script>
<template>
  <thumpi-header :label="label" @back="toLink(upLink)"></thumpi-header>
  {{ $thumpi.debug(info) }}
  <div class="mb-3 mt-3">
    <label for="oaInfoTitle" class="form-label">Title</label>
    <input type="text" class="form-control" id="oaInfoTitle" v-model="info.title" />
  </div>
  <div class="mb-3">
    <label for="oaInfoSummary" class="form-label">Summary</label>
    <input type="text" class="form-control" id="oaInfoSummary" v-model="info.summary" />
  </div>
  <div class="mb-3">
    <label for="oaInfoDescription" class="form-label">Description</label>
    <textarea
      class="form-control"
      id="oaInfoDescription"
      rows="4"
      v-model="info.description"
    ></textarea>
  </div>
  <div class="mb-3">
    <label for="oaInfoTermsOfService" class="form-label">Terms of Service</label>
    <input
      type="text"
      class="form-control"
      id="oaInfoTermsOfService"
      placeholder="<url>"
      v-model="info.termsOfService"
    />
  </div>
  <div class="mb-3">
    <label for="oaInfoVersion" class="form-label">Version</label>
    <input type="text" class="form-control" id="oaInfoVersion" v-model="info.version" />
  </div>
  <ul class="list-group mb-3">
    <li class="list-group-item" @click="toLink(downLink + '/info/contact')">
      <Edit></Edit> Contact
    </li>
    <li class="list-group-item" @click="toLink(downLink + '/info/license')">
      <Edit></Edit> License
    </li>
  </ul>
</template>
