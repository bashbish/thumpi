<script setup>
import { inject } from 'vue'
import {RouterView} from 'vue-router'
import Navbar from './components/navbar.vue'
</script>
<template>
  <Navbar></Navbar>
  <div class="container">
    <div class="row">
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
</template>
