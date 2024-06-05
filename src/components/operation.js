import Plus from './icons/plus.js'
import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Downarrow from './icons/downarrow.js'
import Trash from './icons/trash.js'
import Modal from './modal.vue'
import Alert from './alert.js'
export default {
  components: { Plus, Edit, Uparrow, Downarrow, Trash, Modal, Alert },
  data() {
    return {
      operation: this.$thumpi.getOperation(this.$route),
      tags: this.$thumpi.getTags(this.$route),
      operationType: decodeURIComponent(this.$route.params.opi),
      alert: undefined,
      newTag: undefined,
      modalData: { title: 'Tags', message: 'Delete Tag?', close: 'Cancel', save: 'Delete' },
      target: -1,
      depLink: this.$thumpi.baseLink(this.$route, 'operation')
    }
  },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    addTag() {
      this.alert = undefined
      try {
        this.$thumpi.addOperationTag(this.$route, this.newTag)
        this.newTag = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onDeleteTag() {
      this.alert = undefined
      try {
        this.$thumpi.deleteOperationTag(this.$route, this.target)
        this.target = -1
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink($thumpi.baseLink($route,'path'))">Operation <Uparrow></Uparrow></a>
  </li>
</ul>

 {{ operation }}
 
<div class="mb-3 mt-3">
  <label for="opId" class="form-label">Operation</label>
  <input type="text" class="form-control" id="opId" v-model="operationType" disabled>
</div>


<div class="d-flex align-items-center mb-2">
    <label for="opAction" class="me-auto" >Tags</label>
    <div class="row g-3 d-flex justify-content-center">
      <div class="col-auto">
        <label for="pathTag" class="visually-hidden">Tags</label>
        <select class="form-select" id="pathTag" aria-label="Security Type" v-model="newTag" >  
          <option v-for="tag in tags">{{tag.name}}</option>
        </select>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary" @click="addTag()">Add</button>
      </div>
    </div>
  </div>
        
  <Alert :alert="alert"></Alert>
 
<ul class="list-group mb-3">
    <li class="list-group-item d-flex justify-content-between align-items-start" v-for="tag, index in operation.tags">
        <div class="ms-2 fw-bold d-grid gap-2" >
            <button class="btn btn-sm btn-outline-primary" type="button">{{ tag }}</button>
        </div>
        <div class="d-flex justify-content-evenly">
            <button class="btn btn-sm btn-primary mx-1" @click="target=index" data-bs-toggle="modal" data-bs-target="#tagDeleteModal"><Trash></Trash></button>
        </div>
    </li>
</ul>
<Modal #ref="deleteModal" class="modal fade" id="tagDeleteModal" tabindex="-1" aria-labelledby="tagDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDeleteTag()"></Modal>



<div class="mb-3">
  <label for="opId" class="form-label">Operation ID</label>
  <input type="text" class="form-control" id="opId" v-model="operation.operationId">
</div>

<div class="mb-3 mt-3">
  <label for="exampleFormControlInput1" class="form-label">Summary</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" v-model="operation.summary">
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="operation.description"></textarea>
</div>


<ul class="list-group mb-3">
  
  <li class="list-group-item align-items-start"  @click="toLink(depLink+'/parameters')"><Plus></Plus> Parameters</li>
  <li class="list-group-item align-items-start"  @click="toLink(depLink+'/requestbody')"><Plus></Plus> Request Body</li>
  <li class="list-group-item align-items-start"  @click="toLink(depLink+'/responses')"><Plus></Plus> Responses</li>
  <li class="list-group-item align-items-start"  @click="toLink(depLink+'/callbacks')"><Plus></Plus> Callbacks</li>
  <li class="list-group-item align-items-start"  @click="toLink(depLink+'/security')"><Plus></Plus> Security</li>
  <li class="list-group-item align-items-start"  @click="toLink(depLink+'/servers')"><Plus></Plus> Servers</li>
  <li class="list-group-item align-items-start" @click="toLink(depLink+'/externaldocs')"><Edit></Edit> External Documents</li>
  
</ul>

`
}
