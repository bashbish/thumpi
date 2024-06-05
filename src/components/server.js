import ServerVariables from './servervariables.js'
import Uparrow from './icons/uparrow.js'
export default {
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  data() {
    return {
      server: this.$thumpi.getServer(this.$route),
      doci: this.$route.params.doci,
      servi: this.$route.params.servi
    }
  },
  components: { ServerVariables, Uparrow },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink('/documents/'+doci+'/servers')">Server <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="mb-3 mt-3">
  <label for="oaServersServerURL" class="form-label">URL</label>
  <input type="text" class="form-control" id="oaServersServerURL"  v-model="server.url">
</div>
<div class="mb-3">
  <label for="oaServersServerDescription" class="form-label">Description</label>
  <textarea class="form-control" id="oaServersServerDescription" rows="3" v-model="server.description"></textarea>
</div>
<ServerVariables :doci="doci" :servi="servi"></ServerVariables>

`
}
