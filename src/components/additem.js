import Plus from './icons/plus.js'
export default {
  components: { Plus },
  props: ['memberLabel', 'placeholder'],
  emits: ['member'],
  methods: {
    add() {
      this.$emit('member', this.memberName)
      this.memberName = ''
    }
  },
  data() {
    return {
      memberName: ''
    }
  },
  template: `
<div class="row d-flex justify-content-center align-items-center">
    <div class="col-auto" v-if="memberLabel">
        {{ memberLabel }}
    </div>
    <div class="col-auto">
        <div class="input-group">
                <input type="text" class="form-control" id="itemName"  v-model="memberName">
                <button type="button" class="btn btn-primary" @click="add()" id="addItem"><Plus></Plus> Add</button>
        </div>
    </div>
</div>
`
}
