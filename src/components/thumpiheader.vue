<script setup>
import Uparrow from './icons/uparrow.vue'

const emit = defineEmits(['back'])

defineProps({
  label: { type: String, default: 'missing' },
  backImg: { type: String, default: 'uparrow' }
})
</script>
<template>
  <ul class="nav nav-pills nav-fill mb-3">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page"  @click="emit('back')"
        >{{ label }}&nbsp;<Uparrow></Uparrow
      ></a>
    </li>
  </ul>
</template>
