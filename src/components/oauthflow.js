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
      oauthFlow: this.$thumpi.getOAuthFlow(this.$route),
      labels: 'OAuth Flow',
      name: this.$route.params.oauthFlowi,
      alert: undefined
    }
  },
  watch: {
    $route(to, from) {
      this.oauthFlow = this.$thumpi.getOAuthFlow(to)
      this.name = to.params.securitySchemei
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
{{ $thumpi.debug(oauthFlow) }}
<Alert :alert="alert"></Alert>

<div class="mb-3 mt-3" >
  <label for="securitySchemeName" class="form-label">Name</label>
  <input type="text" class="form-control" id="securitySchemeName" v-model="name" @change="onNameChange">
</div>

<div class="mb-3" >
  <label for="securitySchemeType" class="form-label">Type</label>
  <input type="text" class="form-control" id="securitySchemeType" v-model="securityScheme.type">
</div>
`
}
