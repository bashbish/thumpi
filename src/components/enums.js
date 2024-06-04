import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Trash from './icons/trash.js'
import Modal from './modal.js'
import AddItem from './additem.js'
export default {
  components: { Edit, Uparrow, Trash, Modal, AddItem },
  props: ['enumValues'],
  emits: ['enum'],
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    add(name) {
      this.$emit('enum', name)
      this.$forceUpdate()
    },
    onDelete() {
      this.alert = undefined
      this.enumValues.splice(this.target, 1)
      this.$forceUpdate()
      this.target = undefined
    }
  },
  data() {
    return {
      modalData: { title: 'Enum', message: 'Delete Enum?', close: 'Cancel', save: 'Delete' },
      target: undefined,
      alert: undefined
    }
  },
  template: `
<div class="row mb-2">
     <div class="col">
        <add-item :memberLabel="'Enum'" @member="add" ></add-item>    
        <Modal #ref="deleteModal" class="modal fade" id="enumDeleteModal" tabindex="-1" aria-labelledby="enumDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>
    </div>
    </div>
    <div class="row mx-2">
    <ul class="list-group col" >
        <li class="list-group-item list-group-item-action" v-for="value, index in enumValues">
            <div class="d-flex align-items-center">
                <span class="me-auto">&nbsp;{{ value }}</span>
                <button type="button" class="btn btn-sm btn-primary" @click="target=index" data-bs-toggle="modal" data-bs-target="#enumDeleteModal"><Trash></Trash></button>
            </div>
        </li>
    </ul>
</div>


`
}
