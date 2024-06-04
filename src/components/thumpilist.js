import Edit from './icons/edit.js'
import Trash from './icons/trash.js'
import Modal from './modal.vue'
import Uparrow from './icons/uparrow.js'
import Alert from './alert.js'
import AddMember from './addmember.js'
export default {
  emits: ['onAdd', 'onDelete'],
  props: {
    label: { type: String, required: true },
    keep: { type: Boolean, required: false, default: false },
    alert: { type: String, required: false, default: undefined },
    items: { type: Object, required: true },
    toItem: { type: Function, required: true },
    toItemLabel: { type: Function, required: true },
    modalData: { type: Object, required: true }
  },
  components: { Edit, Trash, Modal, Uparrow, Alert, AddMember },
  methods: {
    onAdd(itemName) {
      this.$emit('onAdd', itemName)
      this.$forceUpdate()
    },
    onDelete() {
      this.$emit('onDelete', this.target)
      this.target = -1
      this.$forceUpdate()
    }
  },
  data() {
    return {
      target: -1
    }
  },
  template: `
<add-member :memberLabel="label" @member="onAdd" :keep="keep"></add-member>
<Alert :alert="alert"></Alert>
<ul class="list-group mt-3">
  <li class="list-group-item list-group-item-action"  v-for="item, index in items">
    <div class="d-flex align-items-center">
        <button class="btn btn-outline-primary me-auto" type="button" @click="toItem(index)" ><Edit></Edit>&nbsp;{{ toItemLabel(item) }}</button>
        <button type="button" class="btn btn-sm btn-primary" @click="target=index" data-bs-toggle="modal" data-bs-target="#deleteModal"><Trash></Trash></button>
    </div>
  </li>
</ul>
<Modal #ref="deleteModal" class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>
`
}
