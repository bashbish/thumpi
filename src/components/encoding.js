import Plus from './icons/plus.js'
import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Alert from './alert.js'
import ThumpiHeader from './thumpiheader.vue'
import Modal from './modal.vue'
import Trash from './icons/trash.js'
import ThumpiItem from './thumpiitem.js'
export default {
  components: { ThumpiHeader, Edit, Plus, Uparrow, Alert, ThumpiItem, Trash, Modal },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    updateEncodingName() {
      this.alert = undefined
      if (this.encodingName != this.$route.params.encodingi) {
        if (this.encodingName && this.encodingName.trim().length > 0) {
          try {
            this.$thumpi.changeEncodingName(this.$route, this.encodingName)
            const newLink =
              this.$thumpi.baseLink(this.$route, 'contentItem') +
              '/encoding/' +
              encodeURIComponent(this.encodingName)
            this.toLink(newLink)
          } catch (e) {
            this.alert = e.message
          }
        } else {
          this.alert = 'encoding name is invalid'
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
      encoding: this.$thumpi.getEncoding(this.$route),
      encodingName: this.$route.params.encodingi,
      alert: undefined,
      baseLink: this.$thumpi.baseLink(this.$route, 'contentitem'),
      labels: 'Encoding',

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
      this.encoding = this.$thumpi.getEncoding(to)
      this.encodingName = to.params.encodingi
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>

<Alert :alert="alert" ></Alert>
{{ encoding }}

<div class="mb-3 mt-3">
  <label for="encodingName" class="form-label">Name</label>
  <input type="text" class="form-control" id="encodingName"  v-model="encodingName" @change="updateEncodingName()">
</div>


<div class="mb-3">
  <label for="encodingStyle" class="form-label">Style</label>
  <input type="text" class="form-control" id="encodingStyle"  v-model="encoding.style" >
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="encodingAllowReserved" v-model="encoding.allowReserved">
  <label class="form-check-label" for="encodingAllowReserved">
    Allow Reserved
  </label>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="encodingExploded" v-model="encoding.exploded">
  <label class="form-check-label" for="encodingExploded">
    Exploded
  </label>
</div>

<div class="mb-3" >
    <div class="d-flex align-items-center" >
        <label class="me-auto" >Headers</label>
        <div class="row g-3 d-flex justify-content-center mb-3">
          <div class="col-auto">
            <label for="encodingHeader" class="visually-hidden">Header</label>
            <input type="text" class="form-control" aria-label="encodingHeader" aria-describedby="encodingHeader" v-model="eHeader">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary" @click="addHeader()"><Plus></Plus></button>
          </div>
      </div>
    </div>

    <ul class="list-group mt-2">
        <li class="list-group-item list-group-item-action" v-for="value, key in encoding.headers" ><thumpi-item :toLink="$thumpi.baseLink($route,'encoding')+'/headers/'+encodeURIComponent(key)" :label="key" :modalId="'deleteHeaderModal'" @delTarget="onHeaderTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
    </ul>
    <Modal #ref="deleteHeaderModal" class="modal fade" id="deleteHeaderModal" tabindex="-1" aria-labelledby="deleteHeaderModalLabel" aria-hidden="true" :title="modalHeaderData.title" :message="modalHeaderData.message" :close="modalHeaderData.close" :save="modalHeaderData.save" @delete="onDeleteHeader()"></Modal>
</div>
`
}
