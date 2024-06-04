import ThumpiHeader from './thumpiheader.vue'
import ThumpiMap from './thumpimap.js'
export default {
  components: { ThumpiHeader, ThumpiMap },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onAdd(pathname) {
      this.alert = undefined
      try {
        this.$thumpi.addPath(this.$route, pathname)
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete(target) {
      this.alert = undefined
      this.$thumpi.deletePath(this.$route, target)
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
      mapItems: this.$thumpi.getPaths(this.$route),
      modalData: { title: 'Paths', message: 'Delete Path?', close: 'Cancel', save: 'Delete' },
      alert: undefined,
      labels: 'Paths',
      label: 'Path',
      navBackTag: 'doc',
      navDownTag: 'paths'
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
<thumpi-map :label="label" :keep="true" :alert="alert" :items="mapItems" :toItem="toItem" :toItemLabel="toItemLabel" :modalData="modalData" @onAdd="onAdd" @onDelete="onDelete"></thumpi-map>
`
}
