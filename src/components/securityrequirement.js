import Uparrow from './icons/uparrow.js'
export default {
  components: { Uparrow },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    onUpdate() {
      this.$thumpi.updateSecurityRequirementName(this.$route, this.$route.params.seci, this.name)
      this.toLink(this.$thumpi.baseLink(this.$route, 'securities'))
    }
  },
  data() {
    return {
      securityRequirement: this.$thumpi.getSecurityRequirement(this.$route),
      name: this.$route.params.seci
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" @click="toLink($thumpi.baseLink($route, 'securities'))">Security Requirement <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="mb-1 mt-3">
  <label for="oaSecReqName" class="form-label">Name</label>
  <input type="text" class="form-control" id="oaSecReqName" placeholder="" v-model="name">
</div>
<div class="row g-3 d-flex justify-content-center mt-1 align-items-center">
    <div class="col-auto">
        <button class="btn btn-primary" type="button" @click="onUpdate()" v-show="this.name !== $route.params.seci">Update</button>
    </div>
</div>
`
}
