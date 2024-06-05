import Edit from './icons/edit.js'
import ThumpiItem from './thumpiitem.js'
export default {
  components: { Edit, ThumpiItem },
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  data() {
    return {
      requestBodies: this.$thumpi.getRequestBodies(this.$route)
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink($thumpi.baseLink($route, 'components'))">Request Bodies</a>
  </li>
</ul>
<ul class="list-group list-group-flush">
  <li class="list-group-item" v-for="item, key in requestBodies" ><thumpi-item :label="key" :toLink="$thumpi.baseLink($route, 'requestBodies')+'/'+key" @toLink="toLink"></thumpi-item></li>
</ul>
`
}
