import Uparrow from './icons/uparrow.js'
export default {
  components: { Uparrow },
  methods: {
    toLink(link) {
      console.log(link, JSON.stringify(this.externalDocs))
      this.$router.push(link)
    }
  },
  data() {
    return {
      externalDocs: this.$thumpi.getExternalDocs(this.$route)
    }
  },
  computed: {
    extDocParentLink() {
      if (this.$route.params['tagi']) {
        return 'tag'
      } else {
        return 'doc'
      }
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">  
    <a class="nav-link active" aria-current="page" href="#" @click="toLink($thumpi.baseLink($route, extDocParentLink ))">External Document <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="mb-3 mt-3">
  <label for="oaExtenerlaDocsDesc" class="form-label">Description</label>
  <input type="text" class="form-control" id="oaExtenerlaDocsDesc"  v-model="externalDocs.description">
</div>
<div class="mb-3">
  <label for="oaExtenerlaDocsURL" class="form-label">URL</label>
  <input type="text" class="form-control" id="oaExtenerlaDocsURL"  v-model="externalDocs.url" required>
</div>
`
}
