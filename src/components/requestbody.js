import ThumpiHeader from './thumpiheader.vue'
import Alert from './alert.js'
import ThumpiItem from './thumpiitem.js'
import Trash from './icons/trash.js'
import Plus from './icons/plus.js'
import Modal from './modal.vue'
export default {
  components: { ThumpiHeader, Alert, ThumpiItem, Plus, Trash, Modal },
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
      console.log('addContent', this.requestContent)
      try {
        this.$thumpi.addContentItem(this.$route, this.requestContent)
        this.requestContent = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onContentTarget(targetContent) {
      this.requestContent = targetContent
    }
  },
  data() {
    return {
      requestBody: this.$thumpi.getRequestBody(this.$route),
      itemType: this.$thumpi.getRequestBodyType(this.$route),
      baseLink: undefined,
      labels: 'Request Body',
      name: undefined,
      refValue: undefined,
      requestContent: undefined,
      modalContentData: {
        title: 'Enum',
        message: 'Delete Content?',
        close: 'Cancel',
        save: 'Delete'
      },
      alert: undefined
    }
  },
  beforeMount() {
    if (Object.hasOwn(this.$route.params, 'requestbodyi')) {
      this.baseLink = this.$thumpi.baseLink(this.$route, 'requestBodies')
      this.name = this.$route.params.requestbodyi
    } else {
      this.baseLink = this.$thumpi.baseLink(this.$route, 'operation')
      this.name = this.$route.params.opi
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>

<Alert :alert="alert"></Alert>
{{ $thumpi.debug(requestBody) }}
<div class="mb-3 mt-3">
  <label for="rRef" class="form-label">Description</label>
  <input type="text" class="form-control" id="rRef" v-model="requestBody.description">
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="pRequired" v-model="requestBody.required">
  <label class="form-check-label" for="pRequired">
    Required
  </label>
</div>


<div class="mb-3" >
    <div class="d-flex align-items-center" >
        <label class="me-auto" >Content</label>
        <div class="row g-3 d-flex justify-content-center mb-3">
          <div class="col-auto">
            <label for="requestContent" class="visually-hidden">Content</label>
            <input type="text" class="form-control" aria-label="requestContent" aria-describedby="requestContent" v-model="requestContent">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary" @click="addContent()"><Plus></Plus></button>
          </div>
      </div>
    </div>

    <ul class="list-group mt-2">
        <li class="list-group-item list-group-item-action" v-for="value, key in requestBody.content" ><thumpi-item :toLink="$thumpi.baseLink($route,'requestBody')+'/content/'+encodeURIComponent(key)" :label="key" :modalId="'deleteContentModal'" @delTarget="onContentTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
    </ul>
    <Modal #ref="deleteContentModal" class="modal fade" id="deleteContentModal" tabindex="-1" aria-labelledby="deleteContentModalLabel" aria-hidden="true" :title="modalContentData.title" :message="modalContentData.message" :close="modalContentData.close" :save="modalContentData.save" @delete="onDeleteContent()"></Modal>
</div>

`
}
