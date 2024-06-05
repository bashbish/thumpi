<script setup>
import { inject } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/navbar.vue'
import fetchYaml from '@/thumpi/fetchYaml.js'

const $thumpi = inject('$thumpi')

fetchYaml('./samples/petstore.yaml', $thumpi)
</script>

<template>
  <Navbar></Navbar>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
</template>
