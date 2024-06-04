import Plus from './icons/plus.js'
export default {
  components: { Plus },
  props: ['memberLabel', 'placeholder', 'keep'],
  emits: ['member'],
  methods: {
    add() {
      this.$emit('member', this.memberName)
      if (!this.keep) {
        this.memberName = undefined
      }
    },
    handleEnterKey() {
      // Programmatically trigger the button click
      this.$refs.addButton.click()
    }
  },
  data() {
    return {
      memberName: undefined
    }
  },
  template: `<div class="row d-flex justify-content-center align-items-center">
    <div class="col-auto" v-if="memberLabel">
        {{ memberLabel }}
    </div>
    <div class="col-auto">
            <label for="memberName" class="visually-hidden">{{ memberLabel }}</label>
            <input type="text" class="form-control" id="memberName"  v-model="memberName" @keyup.enter="handleEnterKey">
    </div>
    <div class="col-auto">
        <button type="button" class="btn btn-sm btn-primary" @click="add()" ref="addButton"><Plus></Plus> Add</button>
    </div>
</div>`
}
