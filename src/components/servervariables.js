import FileAdd from './icons/fileadd.js'
import Edit from './icons/edit.js'
import AddMember from './addmember.js'
import Alert from './alert.js'
import Modal from './modal.vue'
import Trash from './icons/trash.js'
export default {
  emits: ['documents'],
  props: ['doci', 'servi'],
  components: { FileAdd, Edit, AddMember, Alert, Modal, Trash },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    add(name) {
      this.alert = undefined
      console.log('adding server variable', name)
      try {
        this.$thumpi.addServerVariable(this.$route, name)
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
      //this.toLink('/documents/'+this.doci+'/servers/'+this.servi+'/variables/'+name);
    },
    onDelete() {
      this.$thumpi.deleteServerVariable(this.$route, this.target)
      this.target = undefined
      this.$forceUpdate()
    }
  },
  data() {
    return {
      variables: this.$thumpi.getServerVariables(this.$route),
      alert: undefined,
      taget: undefined,
      modalData: {
        title: 'Server Variables',
        message: 'Delete Server Variable?',
        close: 'Cancel',
        save: 'Delete'
      }
    }
  },
  template: `
<ul class="nav nav-pills nav-fill mb-3">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink($thumpi.baseLink($route, 'server'))">Server Variables</a>
  </li>
</ul>
<add-member :memberLabel="'Var'"  @member="add"></add-member>
<Alert :alert="alert" ></Alert>
<ul class="list-group mt-2">
  <li class="list-group-item list-group-item-action"  v-for="value, key in variables">
  <div class="d-flex align-items-center">
    <span @click="toLink($thumpi.baseLink($route, 'server')+'/variables/' + key)" class="me-auto"><button class="btn btn-outline-primary" type="button"><Edit></Edit> {{key}}</button></span>
    <button type="button" class="btn btn-sm btn-primary" @click="target=key" data-bs-toggle="modal" data-bs-target="#svarDeleteModal"><Trash></Trash></button>
    </div>  
   </li>
</ul>
<Modal #ref="deleteModal" class="modal fade" id="svarDeleteModal" tabindex="-1" aria-labelledby="svarDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>

`
}
