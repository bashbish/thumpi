import ThumpiHeader from './thumpiheader.vue'
import Plus from './icons/plus.js'
import Alert from './alert.js'
export default {
  components: { ThumpiHeader, Plus, Alert },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onBack() {
      this.toLink(this.$thumpi.baseLink(this.$route, 'securitySchemes'))
    },
    onNameChange() {
      this.alert = undefined
      if (this.$route.params.securitySchemei !== this.name) {
        console.log('onNameChange', this.$route.params.securitySchemei, this.name)
        try {
          this.$thumpi.changeSecuritySchemeName(this.$route, this.name)
          this.toLink(this.$thumpi.baseLink(this.$route, 'securitySchemes') + '/' + this.name)
        } catch (e) {
          this.alert = e.message
        }
      }
    }
  },
  data() {
    return {
      securityScheme: this.$thumpi.getSecurityScheme(this.$route),
      labels: 'Security Scheme',
      name: this.$route.params.securitySchemei,
      alert: undefined
    }
  },
  watch: {
    $route(to) {
      this.securityScheme = this.$thumpi.getSecurityScheme(to)
      this.name = to.params.securitySchemei
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
{{ $thumpi.debug(securityScheme) }}
<Alert :alert="alert"></Alert>

<div class="mb-3 mt-3" >
  <label for="securitySchemeName" class="form-label">Name</label>
  <input type="text" class="form-control" id="securitySchemeName" v-model="name" @change="onNameChange">
</div>




<div class="mb-3" >
  <label for="securitySchemeType" class="form-label">Type</label>
  <input type="text" class="form-control" id="securitySchemeType" v-model="securityScheme.type">
</div>

<div class="mb-3">
  <label for="securitySchemeDescription" class="form-label">Description</label>
  <textarea class="form-control" id="securitySchemeDescription" rows="4" v-model="securityScheme.description"></textarea>
</div>

<div class="mb-3" >
  <label for="securitySchemeName" class="form-label">Name</label>
  <input type="text" class="form-control" id="securitySchemeName" v-model="securityScheme.name">
</div>

<div class="mb-3 mt-3">
    <label for="securitySchemeIn" class="form-label">In</label>
    <select class="form-select" aria-label="securitySchemeIn" v-model="securityScheme.in">   
        <option value="query">query</option>
        <option value="header">header</option>
        <option value="cookie">cookie</option>
    </select>
</div>

<div class="mb-3" >
  <label for="securitySchemeScheme" class="form-label"><a href="https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml" target="_blank" >Scheme</a></label>
  <input type="text" class="form-control" id="securitySchemeScheme" v-model="securityScheme.scheme">
</div>

<div class="mb-3" >
  <label for="securitySchemeBearerFormat" class="form-label">Bearer Format</label>
  <input type="text" class="form-control" id="securitySchemeBearerFormat" v-model="securityScheme.bearerFormat">
</div>

<div class="mb-3" >
  <label for="securitySchemeOpenIdConnectUrl" class="form-label">OpenId Connect URL</label>
  <input type="text" class="form-control" id="securitySchemeOpenIdConnectUrl" v-model="securityScheme.openIdConnectUrl">
</div>

<div class="mb-3">
  <label for="securitySchemeFlows" class="form-label">Flows</label>
  <input type="text" class="form-control" id="securitySchemeFlows" rows="4" v-model="securityScheme.flows"></input>
</div>
`
}
