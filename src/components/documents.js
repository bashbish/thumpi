import Edit from './icons/edit.js'
import YamlFile from './icons/yamlfile.js'
import FileAdd from './icons/fileadd.js'
import Trash from './icons/trash.js'
import Valid from './icons/shieldvalid.js'
import Invalid from './icons/shieldinvalid.js'
import Modal from './modal.js'
import Downarrow from './icons/downarrow.js'
export default {
  components: { Edit, YamlFile, FileAdd, Trash, Valid, Invalid, Modal, Downarrow },
  emits: ['documents'],
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    add() {
      const newDocIndex = this.$thumpi.addDoc(this.version)
      this.toLink('/documents/' + newDocIndex)
    },
    toDoc(i) {
      this.$router.push('/documents/' + i)
    },
    importYaml() {
      this.$router.push('/yaml')
    },
    onDelete() {
      console.log('onDelete')
      this.$thumpi.deleteDoc(this.target)
      this.target = -1
      this.$forceUpdate()
    }
  },
  data() {
    return {
      docs: this.$thumpi.getDocs(),
      version: '3.0.3',
      title: 'Documents',
      message: 'Delete doc?',
      close: 'Cancel',
      save: 'Delete',
      target: -1
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item" >
    <a class="nav-link active" aria-current="page" href="#" data-bs-toggle="collapse" data-bs-target="#addDocCard" aria-expanded="false" aria-controls="addDocCard">Documents <Downarrow></Downarrow></a>
  </li>
</ul>

<div class="collapse" id="addDocCard">
    <div class="row g-3 d-flex justify-content-center mt-3 mb-3 align-items-center">
    <div class="col-auto">
        OpenAPi Document Version
    </div>
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">OpenAPI Version</label>
        <select class="form-select" aria-label="Default select example" v-model="version">    
          <option value="3.1.0">3.1.0</option>
          <option value="3.0.3">3.0.3</option>
          <option value="3.0.0">3.0.0</option>
        </select>
      </div>
       <div class="col-auto">
            <button type="button" class="btn btn-primary m-2" @click="add()">
                <file-add></file-add> Add
            </button>
            <button type="button" class="btn btn-primary m-2" @click="importYaml()">
                <yaml-file></yaml-file> Import
            </button>
       </div>
 
    </div>
</div>


<ul class="list-group my-3">
    <li class="list-group-item d-flex justify-content-between align-items-start" v-for="doc, index in docs">
        <div class="ms-2 fw-bold d-grid gap-2" @click="toDoc(index)">
           
                <button class="btn btn-sm btn-outline-primary" type="button"><Edit ></Edit> {{ doc?.info?.title }}&nbsp;<span class="text-primary-emphasis">{{ doc?.info?.version }}</span></button>
        </div>
       
        <div class="d-flex justify-content-evenly">
            <button class="btn btn-sm btn-primary" @click="toLink('/documents/'+index+'/yaml')"><YamlFile></YamlFile> Yaml</button>
            <span class="badge bg-primary rounded-pill m-1 justify-content-between " @click="toDoc(index)" v-show="false"> {{ Object.keys(doc.paths || []).length ||0 }} Paths</span>&nbsp;
            <span class="badge bg-info rounded-pill m-1 justify-content-between" @click="toDoc(index)" v-show="false"> {{doc.openapi}}</span>
            <span class="badge text-bg-warning rounded-pill m-1" v-show="false"><Invalid></Invalid></span>
            <button class="btn btn-sm btn-warning mx-1" @click="target=index" data-bs-toggle="modal" data-bs-target="#documentDeleteModal"><Trash></Trash></button>
        </div>
  </li>
  
</ul>
<Modal #ref="deleteModal" class="modal fade" id="documentDeleteModal" tabindex="-1" aria-labelledby="documentDeleteModalLabel" aria-hidden="true" :title="title" :message="message" :close="close" :save="save" @delete="onDelete()"></Modal>
`
}
