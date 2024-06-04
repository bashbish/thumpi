export default {
  props: ['fields'],
  emits: ['fieldEvent'],
  data() {
    return {
      tooltipTriggerList: undefined,
      tooltipList: undefined
    }
  },
  methods: {
    enableAllFields() {
      this.$emit('fieldEvent', 'all', true)
    },
    isDisabled(name) {
      // readOnly only relevant at properties level
      if (name === 'readOnly' && !Object.hasOwn(this.$route.params, 'propi')) {
        return true
      } else if (name === 'writeOnly' && !Object.hasOwn(this.$route.params, 'propi')) {
        return true
      } else if (name === 'xml' && !Object.hasOwn(this.$route.params, 'propi')) {
        return true
      }
      return false
    },
    onFieldChange(key, isEnabled) {
      this.$emit('fieldEvent', key, isEnabled)
    }
  },
  mounted() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    )
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  },
  template: `

<div class="card">
    <div class="card-body">
        <h5 class="card-title" @click="enableAllFields">Fields</h5>
        <div class="row mx-3">
            <div class="form-check form-switch col-xs-12 col-lg-3 mb-2" v-for="field, key in fields">
                <input class="form-check-input" type="checkbox" role="switch" id="schemaField{{field.name}}" v-model="field.enabled" @change="onFieldChange(key, field.enabled)" :disabled="isDisabled(key)"> 
                <label class="form-check-label" for="schemaField{{field.name}}x" data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="field.help" :disabled="isDisabled(key)">{{key}}</label>
            </div>
        </div>
    </div>
</div>
   

`
}
