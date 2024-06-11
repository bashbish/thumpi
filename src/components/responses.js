import ThumpiHeader from './thumpiheader.vue'
import ThumpiMap from './thumpimap.js'
export default {
  components: { ThumpiHeader, ThumpiMap },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onAdd(responsename) {
      this.alert = undefined
      try {
        this.$thumpi.addResponse(this.$route, responsename)
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete(member) {
      this.alert = undefined
      this.$thumpi.deleteResponse(this.$route, member) // map name
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
      mapItems: this.$thumpi.getResponses(this.$route),
      modalData: {
        title: 'Responses',
        message: 'Delete Response?',
        close: 'Cancel',
        save: 'Delete'
      },
      alert: undefined,
      labels: 'Responses',
      label: 'Response',
      navBackTag: 'components',
      navDownTag: 'responses',
      keep: false
    }
  },
  beforeMount() {
    if (this.$route.params.opi) {
      this.navBackTag = "operation";
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
{{ $thumpi.debug(mapItems) }}
<thumpi-map :label="label" :keep="keep" :alert="alert" :items="mapItems" :toItem="toItem" :toItemLabel="toItemLabel" :modalData="modalData" @onAdd="onAdd" @onDelete="onDelete"></thumpi-map>
`
}
