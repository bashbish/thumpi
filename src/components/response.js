import ThumpiHeader from './thumpiheader.vue'
import Plus from './icons/plus.js'
import ThumpiItem from './thumpiitem.js'
import Modal from './modal.vue'
import Alert from './alert.js'
export default {
  components: { ThumpiHeader, Plus, ThumpiItem, Modal, Alert },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onBack() {
      this.toLink(this.baseLink)
    },
    addContent() {
      this.alert = undefined
      console.log('addContent', this.sContent)
      try {
        this.$thumpi.addContentItem(this.$route, this.sContent)
        this.sContent = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onDeleteContent() {
      this.alert = undefined
      try {
        this.$thumpi.deleteContentItem(this.$route, this.targetContent)
        this.$forceUpdate()
        this.targetContent = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onContentTarget(targetContent) {
      this.targetContent = targetContent
    }
  },
  data() {
    return {
      response: this.$thumpi.getResponse(this.$route),
      baseLink: this.$thumpi.baseLink(this.$route, 'responses'),
      labels: 'Response',
      name: this.$route.params.responsei,
      refValue: undefined,
      modalContentData: {
        title: 'Enum',
        message: 'Delete Content?',
        close: 'Cancel',
        save: 'Delete'
      },
      targetContent: undefined,
      sContent: undefined,
      alert: undefined
    }
  },
  beforeMount() {},
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
{{ $thumpi.debug(response) }}
<Alert :alert="alert"></Alert>

<div class="mb-3 mt-3" v-if="name !=='$ref'">
  <label for="rRef" class="form-label">Name</label>
  <input type="text" class="form-control" id="rRef" v-model="name">
</div>

<div class="mb-3 mt-3" v-if="name ==='$ref'">
  <label for="rRef" class="form-label">$ref</label>
  <input type="text" class="form-control" id="rRef" v-model="refValue">
</div>

<div class="mb-3 mt-3" v-if="name !=='$ref'">
  <label for="rDesc" class="form-label">Description</label>
  <input type="text" class="form-control" id="rDesc" v-model="response.description">
</div>

<ul class="list-group mb-3" v-if="name !=='$ref'">
  <li class="list-group-item align-items-start"  @click="alert='Link attribute not implemented'"><Plus></Plus> Links</li>
 </ul>
 
<div class="mb-3" >
    <div class="d-flex align-items-center" >
        <label class="me-auto" >Content</label>
        <div class="row g-3 d-flex justify-content-center mb-3">
          <div class="col-auto">
            <label for="responseContent" class="visually-hidden">Content</label>
            <input type="text" class="form-control" aria-label="schemaEnum" aria-describedby="responseContent" v-model="sContent">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary" @click="addContent()"><Plus></Plus></button>
          </div>
      </div>
    </div>

    <ul class="list-group mt-2">
        <li class="list-group-item list-group-item-action" v-for="value, key in response.content" ><thumpi-item :toLink="$thumpi.baseLink($route,'response')+'/content/'+encodeURIComponent(key)" :label="key" :modalId="'deleteContentModal'" @delTarget="onContentTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
    </ul>
    <Modal #ref="deleteContentModal" class="modal fade" id="deleteContentModal" tabindex="-1" aria-labelledby="deleteContentModalLabel" aria-hidden="true" :title="modalContentData.title" :message="modalContentData.message" :close="modalContentData.close" :save="modalContentData.save" @delete="onDeleteContent()"></Modal>
</div>
    

`
}
