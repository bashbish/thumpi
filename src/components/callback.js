import Plus from './icons/plus.js'
import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Alert from './alert.js'
import ThumpiHeader from './thumpiheader.vue'
import Modal from './modal.js'
import Trash from './icons/trash.js'
import ThumpiItem from './thumpiitem.js'
export default {
  components: { ThumpiHeader, Edit, Plus, Uparrow, Alert, ThumpiItem, Trash, Modal },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    updateCallbackName() {
      this.alert = undefined
      if (this.callbackName != this.$route.params.callbacki) {
        if (this.callbackName && this.callbackName.trim().length > 0) {
          try {
            this.$thumpi.changeCallbackName(this.$route, this.callbackName)
            const newLink =
              this.$thumpi.baseLink(this.$route, 'contentItem') +
              '/callback/' +
              encodeURIComponent(this.callbackName)
            this.toLink(newLink)
          } catch (e) {
            this.alert = e.message
          }
        } else {
          this.alert = 'callback name is invalid'
        }
      }
    },
    onBack() {
      this.toLink(this.baseLink)
    },
    addHeader() {
      this.alert = undefined
      console.log('addHeader', this.eHeader)
      try {
        this.$thumpi.addHeader(this.$route, this.eHeader)
        this.eHeader = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onDeleteHeader() {
      this.alert = undefined
      console.log('onDeleteHeader', this.targetHeader)
      try {
        this.$thumpi.deleteHeader(this.$route, this.targetHeader)
        this.$forceUpdate()
        this.targetHeader = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onHeaderTarget(targetHeader) {
      this.targetHeader = targetHeader
    }
  },
  data() {
    return {
      callback: this.$thumpi.getCallback(this.$route),
      callbackName: this.$route.params.callbacki,
      alert: undefined,
      baseLink: this.$thumpi.baseLink(this.$route, 'contentitem'),
      labels: 'Callback',

      modalHeaderData: {
        title: 'Header',
        message: 'Delete Header?',
        close: 'Cancel',
        save: 'Delete'
      },
      targetHeader: undefined,
      eHeader: undefined
    }
  },
  watch: {
    $route(to, from) {
      this.callback = this.$thumpi.getCallback(to)
      this.callbackName = to.params.callbacki
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>

<Alert :alert="alert" ></Alert>
{{ callback }}

<div class="mb-3 mt-3">
  <label for="callbackName" class="form-label">Name</label>
  <input type="text" class="form-control" id="callbackName"  v-model="callbackName" @change="updateCallbackName()">
</div>


<div class="mb-3">
  <label for="callbackStyle" class="form-label">Style</label>
  <input type="text" class="form-control" id="callbackStyle"  v-model="callback.style" >
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="callbackAllowReserved" v-model="callback.allowReserved">
  <label class="form-check-label" for="callbackAllowReserved">
    Allow Reserved
  </label>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="callbackExploded" v-model="callback.exploded">
  <label class="form-check-label" for="callbackExploded">
    Exploded
  </label>
</div>

<div class="mb-3" >
    <div class="d-flex align-items-center" >
        <label class="me-auto" >Headers</label>
        <div class="row g-3 d-flex justify-content-center mb-3">
          <div class="col-auto">
            <label for="callbackHeader" class="visually-hidden">Header</label>
            <input type="text" class="form-control" aria-label="callbackHeader" aria-describedby="callbackHeader" v-model="eHeader">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary" @click="addHeader()"><Plus></Plus></button>
          </div>
      </div>
    </div>

    <ul class="list-group mt-2">
        <li class="list-group-item list-group-item-action" v-for="value, key in callback.headers" ><thumpi-item :toLink="$thumpi.baseLink($route,'callback')+'/headers/'+encodeURIComponent(key)" :label="key" :modalId="'deleteHeaderModal'" @delTarget="onHeaderTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
    </ul>
    <Modal #ref="deleteHeaderModal" class="modal fade" id="deleteHeaderModal" tabindex="-1" aria-labelledby="deleteHeaderModalLabel" aria-hidden="true" :title="modalHeaderData.title" :message="modalHeaderData.message" :close="modalHeaderData.close" :save="modalHeaderData.save" @delete="onDeleteHeader()"></Modal>
</div>
`
}
