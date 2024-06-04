import ThumpiHeader from './thumpiheader.vue'
import Alert from './alert.js'
import Modal from './modal.vue'
import ThumpiItem from './thumpiitem.js'
import Plus from './icons/plus.js'
export default {
  components: { ThumpiHeader, Alert, Modal, Plus, ThumpiItem },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onBack() {
      this.toLink(this.backLink)
    },
    addExample() {
      this.alert = undefined
      console.log('addExample', this.sExample)
      try {
        this.$thumpi.addExample(this.$route, this.sExample)
        this.sExample = undefined
        this.$forceUpdate()
      } catch (e) {
        console.log(e)
        this.alert = e.message
      }
    },
    onDeleteExample() {
      this.alert = undefined
      try {
        this.$thumpi.deleteExample(this.$route, this.targetExample)
        this.$forceUpdate()
        this.targetExample = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onExampleTarget(targetExample) {
      this.targetExample = targetExample
    },
    addEncoding() {
      this.alert = undefined
      console.log('addEncoding', this.cEncoding)
      try {
        this.$thumpi.addEncoding(this.$route, this.cEncoding)
        this.cEncoding = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onDeleteEncoding() {
      this.alert = undefined
      console.log('onDeleteEncoding', this.targetEncoding)
      try {
        this.$thumpi.deleteEncoding(this.$route, this.targetEncoding)
        this.$forceUpdate()
        this.targetEncoding = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onEncodingTarget(targetEncoding) {
      this.targetEncoding = targetEncoding
    }
  },
  data() {
    return {
      item: this.$thumpi.getContentItem(this.$route),
      baseLink: this.$thumpi.baseLink(this.$route, 'content'),
      labels: 'Media Type',
      name: this.$route.params.contenti,
      refValue: undefined,
      backLink: undefined,
      modalExampleData: {
        title: 'Examples',
        message: 'Delete Example?',
        close: 'Cancel',
        save: 'Delete'
      },
      targetExample: undefined,
      sExample: undefined,
      alert: undefined,
      schemaLink: this.$thumpi.baseLink(this.$route, 'contentitem') + '/schema',

      modalEncodingData: {
        title: 'Encoding',
        message: 'Delete Encoding?',
        close: 'Cancel',
        save: 'Delete'
      },
      targetEncoding: undefined,
      cEncoding: undefined
    }
  },
  beforeMount() {
    if (Object.hasOwn(this.$route.params, 'opi') && this.$route.fullPath.includes('response')) {
      this.backLink = this.$thumpi.baseLink(this.$route, 'content')
    } else if (this.$route.fullPath.includes('requestBody')) {
      this.backLink = this.$thumpi.baseLink(this.$route, 'requestBody')
    } else {
      this.backLink = this.$thumpi.baseLink(this.$route, 'response')
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>

<Alert :alert="alert" ></Alert>
{{ item }}


<div class="mb-3 mt-3" >
  <label for="mediaTypeName" class="form-label">Name</label>
  <input type="text" class="form-control" id="mediaTypeName" v-model="name">
</div>

<ul class="list-group my-3">
    <li class="list-group-item list-group-item-action" @click="toLink(schemaLink)"><Plus></Plus> Schema</li>
</ul>

<div class="mb-3">
  <label for="mediaTypeExample" class="form-label">Example</label>
  <textarea class="form-control" id="mediaTypeExample" rows="4" v-model="item.example"></textarea>
</div>

<div class="mb-3" >
    <div class="d-flex align-items-center" >
        <label class="me-auto" >Examples</label>
        <div class="row g-3 d-flex justify-content-center mb-3">
          <div class="col-auto">
            <label for="mediaTypeExamples" class="visually-hidden">Example</label>
            <input type="text" class="form-control" aria-label="mediaTypeExample" aria-describedby="mediaTypeExample" v-model="sExample">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary" @click="addExample()"><Plus></Plus></button>
          </div>
      </div>    
    </div>
    <ul class="list-group mt-2">
        <li class="list-group-item list-group-item-action" v-for="value, key in item.examples" ><thumpi-item :toLink="$thumpi.baseLink($route,'contentitem')+'/examples/'+key" :label="key" :modalId="'deleteExampleModal'" @delTarget="onExampleTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
    </ul>
    <Modal #ref="deleteExampleModal" class="modal fade" id="deleteExampleModal" tabindex="-1" aria-labelledby="deleteExampleModalLabel" aria-hidden="true" :title="modalExampleData.title" :message="modalExampleData.message" :close="modalExampleData.close" :save="modalExampleData.save" @delete="onDeleteExample()"></Modal>
</div>


<div class="mb-3" >
    <div class="d-flex align-items-center" >
        <label class="me-auto" >Encoding</label>
        <div class="row g-3 d-flex justify-content-center mb-3">
          <div class="col-auto">
            <label for="contentEncoding" class="visually-hidden">Content</label>
            <input type="text" class="form-control" aria-label="contentEncoding" aria-describedby="contentEncoding" v-model="cEncoding">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary" @click="addEncoding()"><Plus></Plus></button>
          </div>
      </div>
    </div>

    <ul class="list-group mt-2">
        <li class="list-group-item list-group-item-action" v-for="value, key in item.encoding" ><thumpi-item :toLink="$thumpi.baseLink($route,'contentitem')+'/encoding/'+encodeURIComponent(key)" :label="key" :modalId="'deleteEncodingModal'" @delTarget="onEncodingTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
    </ul>
    <Modal #ref="deleteEncodingModal" class="modal fade" id="deleteEncodingModal" tabindex="-1" aria-labelledby="deleteEncodingModalLabel" aria-hidden="true" :title="modalEncodingData.title" :message="modalEncodingData.message" :close="modalEncodingData.close" :save="modalEncodingData.save" @delete="onDeleteEncoding()"></Modal>
</div>

`
}
