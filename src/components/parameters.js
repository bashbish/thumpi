import ThumpiHeader from './thumpiheader.vue'
import ThumpiList from './thumpilist.js'
export default {
  components: { ThumpiHeader, ThumpiList },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onAdd(paramName) {
      this.alert = undefined
      try {
        this.$thumpi.addParameter(this.$route, paramName)
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete(targetIdx) {
      this.alert = undefined
      this.$thumpi.deleteParameter(this.$route, targetIdx)
    },
    onBack() {
      this.toLink(this.$thumpi.baseLink(this.$route, this.navBackTag))
    },
    toItem(idx) {
      const link =
        this.$thumpi.baseLink(this.$route, this.navDownTag) +
        '/' +
        encodeURIComponent(this.listItems[idx].name)
      console.log(
        'parameters',
        'toLink',
        link,
        'navDownTag',
        this.navDownTag,
        'fullPath',
        this.$route.fullPath
      )
      this.toLink(link)
    },
    toItemLabel(item) {
      return item.name
    }
  },
  data() {
    return {
      listItems: this.$thumpi.getParameters(this.$route),
      modalData: {
        title: 'Parameters',
        message: 'Delete Parameter?',
        close: 'Cancel',
        save: 'Delete'
      },
      alert: undefined,
      labels: 'Parameters',
      label: 'Parameter',
      navBackTag: 'path',
      navDownTag: 'parameters'
    }
  },
  beforeMount() {
    if (this.$route.fullPath.includes('components')) {
      this.navBackTag = 'components'
    } else if (this.$route.params.hasOwnProperty('opi')) {
      this.navBackTag = 'operation'
    }
  },
  template: `
<thumpi-header :label="labels" @back="onBack"></thumpi-header>
{{ $thumpi.debug(listItems) }}
<thumpi-list :label="label" :keep="false" :alert="alert" :items="listItems" :toItem="toItem" :toItemLabel="toItemLabel" :modalData="modalData" @onAdd="onAdd" @onDelete="onDelete"></thumpi-list>
`
}
