import Uparrow from './icons/uparrow.js'
export default {
  components: { Uparrow },
  methods: {
    toLink(link) {
      this.$router.push(link)
    },
    onSvarChange() {
      if (this.$route.params.svar != this.svar) {
        this.variable = this.$thumpi.serverVariableRename(this.$route, this.svar)
        this.$forceUpdate()
      }
    }
  },
  data() {
    return {
      variable: this.$thumpi.getServerVariable(this.$route),
      svar: this.$route.params.svar
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" @click="toLink($thumpi.baseLink($route,'server'))">Server Variable <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="mb-3 mt-3">
  <label for="svar" class="form-label">Name</label>
  <input type="text" class="form-control" id="svar"  v-model="svar" aria-label="Variable name" @change="onSvarChange">
</div>
<div class="mb-3">
  <label for="svarDefault" class="form-label">Default</label>
  <input type="text" class="form-control" id="svarDefault"  v-model="variable.default"></input>
</div>
<div class="mb-3">
  <label for="svarDesc" class="form-label">Description</label>
  <textarea class="form-control" id="svarDesc" rows="3" v-model="variable.description"></textarea>
</div>
`
}
