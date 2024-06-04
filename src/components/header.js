import Uparrow from './icons/uparrow.js'
import Plus from './icons/plus.js'
export default {
  components: { Uparrow, Plus },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onNameChange() {
      this.alert = undefined
      if (this.$route.params.headeri !== this.headeri) {
        console.log('onNameChange', this.$route.params.headeri, this.headeri)
        this.toLink(this.$thumpi.baseLink(this.$route, 'headers') + '/' + this.headeri)
        try {
          this.$thumpi.changeHeaderName(this.$route, this.headeri)
          this.$forceUpdate()
        } catch (e) {
          this.alert = e.message
        }
      }
    }
  },
  data() {
    return {
      header: this.$thumpi.getHeader(this.$route),
      headeri: this.$route.params.headeri,
      baseLink: this.$thumpi.baseLink(this.$route, 'headers'),
      schemaLink: this.$thumpi.baseLink(this.$route, 'schema')
    }
  },
  watch: {
    $route(to, from) {
      this.header = this.$thumpi.getHeader(to)
      this.schemaLink = this.$thumpi.baseLink(to, 'schema')
      console.log('Route has changed, fetching new data!', to.fullPath)
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" @click="toLink($thumpi.baseLink($route,'headers'))">Header <Uparrow></Uparrow></a>
  </li>
</ul>
{{ $thumpi.debug(header) }}
<div class="mb-3 mt-3">
  <label for="pName" class="form-label">Name</label>
  <input type="text" class="form-control" id="pName" v-model="headeri" @change="onNameChange">
</div>
  
<div class="mb-3 mt-3">
    <label for="pIn" class="form-label">In</label>
    <select class="form-select" aria-label="pIn" v-model="header.in">   
        <option value="query">query</option>
        <option value="header">header</option>
        <option value="path">path</option>
        <option value="cookie">cookie</option>
    </select>
</div>

<div class="mb-3">
  <label for="pDescription" class="form-label">Description</label>
  <textarea class="form-control" id="pDescription" rows="4" v-model="header.description"></textarea>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="pRequired" v-model="header.required">
  <label class="form-check-label" for="pRequired">
    Required
  </label>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="pDeprecated" v-model="header.deprecated">
  <label class="form-check-label" for="pDeprecated">
    Deprecated
  </label>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="pRequired" v-model="header.allowEmptyValue">
  <label class="form-check-label" for="pRequired">
    Allow Empty Value
  </label>
</div>


  <ul class="list-group my-3">
    <li class="list-group-item list-group-item-action" @click="toLink(schemaLink)"><Plus></Plus> Schema</li>
  </ul>
`
}
