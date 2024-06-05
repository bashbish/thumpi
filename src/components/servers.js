import FileAdd from './icons/fileadd.js'
import Edit from './icons/edit.js'
import Trash from './icons/trash.js'
import Modal from './modal.vue'
import Uparrow from './icons/uparrow.js'
import Alert from './alert.js'
import AddMember from './addmember.js'
export default {
  emits: ['documents'],
  components: { FileAdd, Edit, Trash, Modal, Uparrow, Alert, AddMember },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    add(name) {
      this.alert = undefined
      try {
        this.$thumpi.addServer(this.$route, name)
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
      //this.toLink(this.thumpi.baseLink(this.$route,'servers') +'/'+(this.servers.length-1));
    },
    onDelete() {
      this.alert = undefined
      this.$thumpi.deleteServer(this.$route, this.target)
      // this.servers.splice(this.target,1);
      this.target = -1
      this.$forceUpdate()
    }
  },
  data() {
    return {
      servers: this.$thumpi.getServers(this.$route),
      modalData: { title: 'Servers', message: 'Delete Server?', close: 'Cancel', save: 'Delete' },
      target: -1,
      alert: undefined,
      upLink: undefined
    }
  },
  beforeMount() {
    if (this.$route.params.pathi) {
      this.upLink = this.$thumpi.baseLink(this.$route, 'path')
    } else {
      this.upLink = this.$thumpi.baseLink(this.$route, 'document')
    }
  },
  template: `
<ul class="nav nav-pills nav-fill mb-3">    
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink(upLink)">Servers <Uparrow></Uparrow></a>
  </li>
</ul>
{{ $thumpi.debug(servers) }}
<add-member :memberLabel="'Server'" @member="add"></add-member>
<Alert :alert="alert"></Alert>
<ul class="list-group mt-3">
  <li class="list-group-item list-group-item-action"  v-for="server, index in servers">
    <div class="d-flex align-items-center">
        <button class="btn btn-outline-primary me-auto" type="button" @click="toLink($thumpi.baseLink($route,'servers')+'/'+encodeURIComponent(server.url))" ><Edit></Edit>&nbsp;{{ server.url }}</button>
        <button type="button" class="btn btn-sm btn-primary" @click="target=index" data-bs-toggle="modal" data-bs-target="#serverDeleteModal"><Trash></Trash></button>
    </div>
  </li>
</ul>
<Modal #ref="deleteModal" class="modal fade" id="serverDeleteModal" tabindex="-1" aria-labelledby="serverDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>
`
}
