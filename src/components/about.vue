<script setup>
import Uparrow from './icons/uparrow.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const toLink = (link) => {
  console.log(link)
  router.push(link)
}
</script>
<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item">
      <a
        class="nav-link active"
        aria-current="page"
        href="#"
        @click="toLink($thumpi.baseLink(route, 'documents'))"
        >About <Uparrow></Uparrow
      ></a>
    </li>
  </ul>
  <p class="mt-3">
    <a class="link-primary" href="https://github.com/bashbish" target="_blank"
      >github.com/bashbish</a
    >
  </p>
</template>
