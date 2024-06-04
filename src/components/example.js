import ThumpiHeader from './thumpiheader.vue'
import Plus from './icons/plus.js'
export default {
  components: { ThumpiHeader, Plus },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onBack() {
      this.toLink(this.baseLink)
    },
    onNameChange() {
      this.alert = undefined
      if (this.$route.params.examplei !== this.name) {
        console.log('onNameChange', this.$route.params.examplei, this.name)
        this.toLink(this.$thumpi.baseLink(this.$route, 'examples') + '/' + this.name)
        try {
          this.$thumpi.changeExampleName(this.$route, this.name)
          this.$forceUpdate()
        } catch (e) {
          this.alert = e.message
        }
      }
    }
  },
  data() {
    return {
      item: this.$thumpi.getExample(this.$route),
      baseLink: undefined,
      labels: 'Example',
      name: this.$route.params.examplei
    }
  },
  beforeMount() {
    if (Object.hasOwn(this.$route.params, 'contenti')) {
      this.baseLink = this.$thumpi.baseLink(this.$route, 'contentitem')
    } else {
      this.baseLink = this.$thumpi.baseLink(this.$route, 'examples')
    }
  },
  watch: {
    $route(to, from) {
      ;(this.item = this.$thumpi.getExample(to)),
        (this.name = to.params.examplei),
        console.log('Route has changed, fetching new data!', to.fullPath)
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>

<div class="mb-3 mt-3" >
  <label for="exampleName" class="form-label">Name</label>
  <input type="text" class="form-control" id="exampleName" v-model="name" @change="onNameChange">
</div>


<div class="mb-3">
  <label for="exampleSummary" class="form-label">Summary</label>
  <textarea class="form-control" id="exampleSummary" rows="4" v-model="item.summary"></textarea>
</div>

<div class="mb-3">
  <label for="exampleDescription" class="form-label">Description</label>
  <textarea class="form-control" id="exampleDescription" rows="4" v-model="item.description"></textarea>
</div>

<div class="mb-3">
  <label for="exampleValue" class="form-label">Value</label>
  <textarea class="form-control" id="exampleValue" rows="4" v-model="item.value"></textarea>
</div>

<div class="mb-3">
  <label for="exampleExternalValue" class="form-label">External Value</label>
  <textarea class="form-control" id="exampleExternalValue" rows="4" v-model="item.externalValue"></textarea>
</div>
`
}
