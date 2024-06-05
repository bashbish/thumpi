import Edit from './icons/edit.js'
import Downarrow from './icons/downarrow.js'
import Uparrow from './icons/uparrow.js'
import Plus from './icons/plus.js'
import Alert from './alert.js'
import Trash from './icons/trash.js'
import Modal from './modal.vue'
import ThumpiItem from './thumpiitem.js'
export default {
  components: { Edit, Downarrow, Uparrow, Plus, Alert, Trash, Modal, ThumpiItem },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },

    addOperation() {
      this.alert = undefined
      try {
        this.$thumpi.addOperation(this.$route, this.op)
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    updatePathName() {
      this.alert = undefined
      if (this.pathi === decodeURIComponent(this.$route.params.pathi)) {
        return
      }
      try {
        this.$thumpi.updatePathName(this.$route, this.pathi)
        this.path = this.$thumpi.getPaths(this.$route)[this.pathi]
        //this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onDeleteOp() {
      this.alert = undefined
      try {
        this.$thumpi.deleteOperation(this.$route, this.target)
        this.$forceUpdate()
        this.target = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onOperationTarget(target) {
      this.target = target
    },
    addParameter() {
      this.alert = undefined
      console.log('addParameter', this.pParameter)
      try {
        this.$thumpi.addParameter(this.$route, this.pParameter)
        this.pParameter = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onDeleteParameter() {
      this.alert = undefined
      try {
        this.$thumpi.deleteParameter(this.$route, this.targetParameter)
        this.$forceUpdate()
        this.targetParameter = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onParameterTarget(targetParameter) {
      this.targetParameter = targetParameter
    }
  },
  data() {
    return {
      path: this.$thumpi.getPath(this.$route),
      doci: this.$route.params.doci,
      pathi: decodeURIComponent(this.$route.params.pathi),
      op: 'get',
      variables: {},
      alert: undefined,
      modalOpData: {
        title: 'Operations',
        message: 'Delete Operation?',
        close: 'Cancel',
        save: 'Delete'
      },
      target: undefined,
      targetParameter: undefined,
      pParameter: undefined,
      modalParameterData: {
        title: 'Parameters',
        message: 'Delete Parameter?',
        close: 'Cancel',
        save: 'Delete'
      }
    }
  },
  template: `
<ul class="nav nav-pills nav-fill mb-3">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page"  @click="toLink($thumpi.baseLink($route,'paths'))">Path Item <Uparrow></Uparrow></a>
  </li>
</ul>
{{ $thumpi.debug(path) }}
<Alert :alert="alert"></Alert>

<div class="mb-3 mt-3">
  <label for="pathi" class="form-label">Path</label>      
  <input type="text" class="form-control" id="pathi" aria-describedby="pathi" v-model="pathi" @change="updatePathName">
</div>

<div class="d-flex align-items-center">
    <label for="opAction"  class="me-auto" >Operations</label>
    <div class="row g-3 d-flex justify-content-center">
      <div class="col-auto">
        <label for="opAction" class="visually-hidden">Operation</label>
        <select class="form-select" id="opAction" aria-label="Default select example" v-model="op">  
          <option value=""></option>  
          <option value="get"  v-if="!path.hasOwnProperty('get')">get</option>
           <option value="put"  v-if="!path.hasOwnProperty('put')">put</option>
          <option value="post" v-if="!path.hasOwnProperty('post')" >post</option>
          <option value="delete" v-if="!path.hasOwnProperty('delete')">delete</option>
          <option value="options" v-if="!path.hasOwnProperty('options')">options</option>
          <option value="head" v-if="!path.hasOwnProperty('head')">head</option>
          <option value="patch" v-if="!path.hasOwnProperty('patch')">patch</option>
          <option value="trace" v-if="!path.hasOwnProperty('trace')">trace</option>
        </select>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary" @click="addOperation()">Add</button>
      </div>
  </div>
</div>


 <ul class="list-group mt-2">
  <li class="list-group-item list-group-item-action" v-if="path.get"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'get'" :label="'get'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item list-group-item-action" v-if="path.put"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'put'" :label="'put'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item list-group-item-action" v-if="path.post"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'post'" :label="'post'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item list-group-item-action" v-if="path.delete"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'delete'" :label="'delete'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item list-group-item-action" v-if="path.options"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'options'" :label="'options'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
 <li class="list-group-item list-group-item-action" v-if="path.head"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'head'" :label="'head'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item list-group-item-action" v-if="path.patch"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'patch'" :label="'patch'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item list-group-item-action" v-if="path.trace"><thumpi-item :toLink="$thumpi.baseLink($route,'operations')+'/'+'trace'" :label="'trace'" :modalId="'deleteOpModalLabel'" @delTarget="onOperationTarget" @toLink="toLink"></thumpi-item></li>
</ul>
<Modal #ref="deleteOpModal" class="modal fade" id="deleteOpModal" tabindex="-1" aria-labelledby="deleteOpModalLabel" aria-hidden="true" :title="modalOpData.title" :message="modalOpData.message" :close="modalOpData.close" :save="modalOpData.save" @delete="onDeleteOp()"></Modal>

  
<ul class="list-group my-3">
  <li class="list-group-item list-group-item-action"  @click="toLink($thumpi.baseLink($route,'servers'))"><Plus></Plus> Servers</li>
</ul>

   <div class="mb-3">
        <div class="d-flex align-items-center" >
            <label class="me-auto" >Parameters</label>
            <div class="row g-3 d-flex justify-content-center mb-3">
              <div class="col-auto">
                <label for="pathParameter" class="visually-hidden">Parameter</label>
                <input type="text" class="form-control" aria-label="pathParameter" aria-describedby="schemaEnum" v-model="pParameter">
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary" @click="addParameter()"><Plus></Plus></button>
              </div>
          </div>
        </div>
        <ul class="list-group mt-2">
            <li class="list-group-item list-group-item-action" v-for="value, index in path.parameters" ><thumpi-item :toLink="$thumpi.baseLink($route,'parameters')+'/'+value.name" :label="value.name" :modalId="'deleteParameterModal'" @delTarget="onParameterTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
        </ul>
        <Modal #ref="deleteParameterModal" class="modal fade" id="deleteParameterModal" tabindex="-1" aria-labelledby="deleteParameterModalLabel" aria-hidden="true" :title="modalParameterData.title" :message="modalParameterData.message" :close="modalParameterData.close" :save="modalParameterData.save" @delete="onDeleteParameter()"></Modal>
    </div>
    


<div class="mb-3">
  <label for="pathItemRef" class="form-label">$ref</label>
   <input type="text" class="form-control" id="pathItemRef" v-model="path.$ref">
</div>

<div class="mb-3 mt-3">
  <label for="pathItemSummary" class="form-label">Summary</label>      
  <input type="text" class="form-control" id="pathItemSummary" v-model="path.summary">
</div>

<div class="mb-3">
  <label for="pathItemDescription" class="form-label">Description</label>
  <textarea class="form-control" id="pathItemDescription" rows="3"></textarea>
</div>


`
}
