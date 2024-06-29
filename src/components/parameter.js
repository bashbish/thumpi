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
      if (this.$route.params.parami !== this.parami) {
        console.log('onNameChange', this.$route.params.parami, this.parami)
        this.toLink(this.$thumpi.baseLink(this.$route, 'parameters') + '/' + this.parami)
        try {
          this.$thumpi.changeParameterName(this.$route, this.parami)
          this.$forceUpdate()
        } catch (e) {
          this.alert = e.message
        }
      }
    }
  },
  data() {
    return {
      parameter: this.$thumpi.getParameter(this.$route),
      parami: this.$route.params.parami,
      baseLink: this.$thumpi.baseLink(this.$route, 'parameters'),
      schemaLink: this.$thumpi.baseLink(this.$route, 'schema'),
      upLink: undefined,
    }
  },
  watch: {
    $route(to, from) {
      this.parameter = this.$thumpi.getParameter(to)
      this.schemaLink = this.$thumpi.baseLink(to, 'schema')
      console.log('Route has changed, fetching new data!', to.fullPath)
    }
  },
  beforeMount() {
    if (Object.hasOwn(this.$route.params, 'pathi')) {
      this.upLink = this.$thumpi.baseLink(this.$route, 'path')
    } else {
      this.upLink = $thumpi.baseLink(this.$route,'parameters')
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink(upLink)">Parameter <Uparrow></Uparrow></a>
  </li>
</ul>
  {{ $thumpi.debug(parameter) }}
<div class="mb-3 mt-3">
  <label for="pName" class="form-label">Name</label>
  <input type="text" class="form-control" id="pName" v-model="parami" @change="onNameChange">
</div>

<div class="mb-3 mt-3">
    <label for="pIn" class="form-label">In</label>
    <select class="form-select" aria-label="pIn" v-model="parameter.in">   
        <option value="query">query</option>
        <option value="header">header</option>
        <option value="path">path</option>
        <option value="cookie">cookie</option>
    </select>
</div>

<div class="mb-3">
  <label for="pDescription" class="form-label">Description</label>
  <textarea class="form-control" id="pDescription" rows="4" v-model="parameter.description"></textarea>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="pRequired" v-model="parameter.required">
  <label class="form-check-label" for="pRequired">
    Required
  </label>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="pDeprecated" v-model="parameter.deprecated">
  <label class="form-check-label" for="pDeprecated">
    Deprecated
  </label>
</div>

<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="pRequired" v-model="parameter.allowEmptyValue">
  <label class="form-check-label" for="pRequired">
    Allow Empty Value
  </label>
</div>


  <ul class="list-group my-3">
    <li class="list-group-item list-group-item-action" @click="toLink(schemaLink)"><Plus></Plus> Schema</li>
  </ul>
`
}
