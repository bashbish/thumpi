import Edit from './icons/edit.js'
import ThumpiHeader from "@/components/thumpiheader.vue";
export default {
  components: { Edit, ThumpiHeader },
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  data() {
    return {
      callbacks: this.$thumpi.getCallbacks(this.$route),
      upLink: undefined,
      label: 'Callbacks',

    }
  },
  beforeMount() {
    if (this.$route.fullPath.includes('components/callbacks')) {
      this.upLink = this.$thumpi.baseLink(this.$route, 'components')
    } else {
      this.upLink = this.$thumpi.baseLink(this.$route, 'operation')
    }
  },
  template: `
    <thumpi-header :label="label" @back="toLink(upLink)"></thumpi-header>
    {{ callbacks }}
<ul class="list-group">
  <li class="list-group-item list-group-item-action" @click="toLink('/documents/'+  doci +'/components/callbacks/'+index)" v-for="item, index in callbacks"><Edit></Edit> {{item}}</li>
</ul>
`
}
