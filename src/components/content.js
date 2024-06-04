import ThumpiHeader from './thumpiheader.vue'
import ThumpiMap from './thumpimap.js'
export default {
  components: { ThumpiHeader, ThumpiMap },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onAdd(mimetype) {
      this.alert = undefined
      try {
        this.$thumpi.addContent(this.$route, mimetype)
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete(target) {
      this.alert = undefined
      this.$thumpi.deleteContent(this.$route, target)
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
      mapItems: this.$thumpi.getContent(this.$route),
      modalData: { title: 'Content', message: 'Delete Content?', close: 'Cancel', save: 'Delete' },
      alert: undefined,
      labels: 'Content',
      label: 'Content',
      navBackTag: 'response',
      navDownTag: 'mediatype'
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
<thumpi-map :label="label" :keep="true" :alert="alert" :items="mapItems" :toItem="toItem" :toItemLabel="toItemLabel" :modalData="modalData" @onAdd="onAdd" @onDelete="onDelete"></thumpi-map>
`
}
