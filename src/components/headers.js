import ThumpiHeader from './thumpiheader.vue'
import ThumpiMap from './thumpimap.js'
export default {
  components: { ThumpiHeader, ThumpiMap },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onAdd(name) {
      this.alert = undefined
      try {
        this.$thumpi.addHeader(this.$route, name)
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete(member) {
      this.alert = undefined
      this.$thumpi.deleteHeader(this.$route, member) // map name
    },
    onBack() {
      this.toLink(this.$thumpi.baseLink(this.$route, this.navBackTag))
    },
    toItem(key) {
      this.toLink(
        this.$thumpi.baseLink(this.$route, this.navDownTag) + '/' + encodeURIComponent(key)
      )
    },
    toItemLabel(key) {
      return key
    }
  },
  data() {
    return {
      mapItems: this.$thumpi.getHeaders(this.$route),
      modalData: { title: 'Headers', message: 'Delete Header?', close: 'Cancel', save: 'Delete' },
      alert: undefined,
      labels: 'Headers',
      label: 'Header',
      navBackTag: 'components',
      navDownTag: 'headers',
      keep: false
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
{{ $thumpi.debug(mapItems) }}
<thumpi-map :label="label" :keep="keep" :alert="alert" :items="mapItems" :toItem="toItem" :toItemLabel="toItemLabel" :modalData="modalData" @onAdd="onAdd" @onDelete="onDelete"></thumpi-map>
`
}
