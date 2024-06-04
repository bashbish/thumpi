import Edit from './icons/edit.js'
export default {
  components: { Edit },
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  data() {
    return {
      links: this.$thumpi.getDocs()[this.$route.params.doci].components.links,
      doci: this.$route.params.doci
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" @click="toLink('/documents/'+doci+'/components')">Links</a>
  </li>
</ul>
<ul class="list-group">
  <li class="list-group-item list-group-item-action" @click="toLink('/documents/'+  doci +'/components/links/'+index)" v-for="item, index in links"><Edit></Edit> {{item}}</li>
</ul>
`
}
