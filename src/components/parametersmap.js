import ThumpiHeader from './thumpiheader.vue'
import ThumpiMap from './thumpimap.js'
export default {
  components: { ThumpiHeader, ThumpiList },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onAdd(name) {
      this.alert = undefined
      try {
        this.$thumpi.addParameter(this.$route, name)
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete(name) {
      this.alert = undefined
      this.$thumpi.deleteParameter(this.$route, name)
    },
    onBack() {
      this.toLink(this.$thumpi.baseLink(this.$route, this.navBackTag))
    },
    toItem(idx) {
      this.toLink(
        this.$thumpi.baseLink(this.$route, this.navDownTag) +
          '/' +
          encodeURIComponent(this.listItems[idx].name)
      )
    },
    toItemLabel(item) {
      return item.name
    }
  },
  data() {
    return {
      mapItems: this.$thumpi.getParameters(this.$route),
      modalData: {
        title: 'Parameters',
        message: 'Delete Parameter?',
        close: 'Cancel',
        save: 'Delete'
      },
      alert: undefined,
      labels: 'Parameters',
      label: 'Operation',
      navBackTag: 'path',
      navDownTag: 'parameters'
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
<thumpi-map :label="label" :keep="false" :alert="alert" :items="listItems" :toItem="toItem" :toItemLabel="toItemLabel" :modalData="modalData" @onAdd="onAdd" @onDelete="onDelete"></thumpi-map>
`
}
