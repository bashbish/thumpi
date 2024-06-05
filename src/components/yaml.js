import YamlFile from './icons/yamlfile.js'
import Uparrow from './icons/uparrow.js'
export default {
  components: { YamlFile, Uparrow },
  methods: {
    toLink(link) {
      this.$router.push(link)
    },
    importYaml() {
      if (!this.copy || this.copy == '') {
        return
      }
      const imported = this.$jsyamlLoad(this.copy)
      if (!imported.openapi) {
        imported.openapi = '3.0.3'
      }
      if (!imported.info) {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        imported.info = { title: 'imported - ' + formatter.format(now), version: '0.0.1' }
      }
      if (!imported.paths) {
        imported.paths = []
      }
      this.$thumpi.getDocs().push(imported)
      this.$router.push('/documents')
    }
  },
  data() {
    return {
      yaml: undefined,
      mode: 'show',
      copy: undefined
    }
  },
  beforeMount() {
    if (this.$route.fullPath.startsWith('/yaml')) {
      this.mode = 'import'
    } else {
      this.yaml = this.$thumpi.getDoc(this.$route)
    }
  },
  template: `

   <button type="button" class="btn btn-primary m-2" @click="importYaml()" v-if="mode === 'import'">
                <YamlFile></YamlFile> Import
            </button>
<ul class="nav nav-pills nav-fill mb-3">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink('/documents')">YAML <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="mb-3" v-if="mode=='show'">
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="30" >{{$jsyamldump(yaml)}}</textarea>
</div>
<div class="mb-3" v-if="mode=='import'">
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="30" v-model="copy"></textarea>
</div>

`
}
