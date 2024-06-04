<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const emit = defineEmits(['delete'])

const props = defineProps(['title', 'message', 'close', 'save'])

const toLink = (link) => {
  router.push(link)
}

const action = () => {
  emit('delete')
}
</script>
<template>
  <div class="modal" tabindex="-1" id="my-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ close }}
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="action()">
            {{ save }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
