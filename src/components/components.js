import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import ThumpiHeader from './thumpiheader.vue'
import ThumpiItem from './thumpiitem.js'
export default {
  components: { Edit, ThumpiHeader, ThumpiItem },
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  data() {
    return {
      components: this.$thumpi.getComponents(this.$route),
      openapiVersion: this.$thumpi.getDoc(this.$route).openapi,
      upLink: this.$thumpi.baseLink(this.$route, 'document'),
      componentsLink: this.$thumpi.baseLink(this.$route, 'components'),
      label: 'Components'
    }
  },
  template: `
<thumpi-header :label="label" @back="toLink(upLink)"></thumpi-header>
<ul class="list-group list-group-flush">
  <li class="list-group-item"><thumpi-item :label="'Schemas'" :toLink="componentsLink+'/schemas'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Responses'" :toLink="componentsLink+'/responses'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Parameters'" :toLink="componentsLink+'/parameters'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Examples'" :toLink="componentsLink+'/examples'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Request Bodies'" :toLink="componentsLink+'/requestBodies'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Headers'" :toLink="componentsLink+'/headers'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Security Schemes'" :toLink="componentsLink+'/securitySchemes'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Links'" :toLink="componentsLink+'/links'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item"><thumpi-item :label="'Callbacks'" :toLink="componentsLink+'/callbacks'" @toLink="toLink"></thumpi-item></li>
  <li class="list-group-item" v-show="openapiVersion==='3.1.0'"><thumpi-item :label="'Path Items'" :toLink="componentsLink+'/paths'" @toLink="toLink"></thumpi-item></li>
</ul>
`
}
