import Edit from './icons/edit.js'
import Alert from './alert.js'
import ThumpiItem from './thumpiitem.js'
import ThumpiHeader from './thumpiheader.vue'
export default {
  components: { Edit, Alert, ThumpiItem, ThumpiHeader },
  methods: {
    toLink(link) {
      this.$router.push(link)
    },
    onBack() {
      this.toLink(this.$thumpi.baseLink(this.$route, 'components'))
    }
  },
  data() {
    return {
      securitySchemes: this.$thumpi.getSecuritySchemes(this.$route)
    }
  },
  template: `


<thumpi-header :label="'Security Schemes'" @back="onBack"></thumpi-header>
{{ $thumpi.debug(securitySchemes) }}
<Alert :alert="alert"></Alert>

<ul class="list-group list-group-flush">
  <li class="list-group-item" v-for="item, key in securitySchemes" ><thumpi-item :label="key" :toLink="$thumpi.baseLink($route, 'securitySchemes')+'/'+encodeURIComponent(key)" @toLink="toLink"></thumpi-item></li>
</ul>
`
}
