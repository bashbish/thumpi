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
      callbacks: this.$thumpi.getDocs()[this.$route.params.doci].components.callbacks,
      doci: this.$route.params.doci
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" @click="toLink('/documents/'+doci+'/components')">Callbacks</a>
  </li>
</ul>
<ul class="list-group">
  <li class="list-group-item list-group-item-action" @click="toLink('/documents/'+  doci +'/components/callbacks/'+index)" v-for="item, index in callbacks"><Edit></Edit> {{item}}</li>
</ul>
`
}
