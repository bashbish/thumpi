import Uparrow from './icons/uparrow.js'
export default {
  components: { Uparrow },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    }
  },
  data() {
    return {
      license: this.$thumpi.getLicense(this.$route)
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink($thumpi.baseLink($route,'doc'))">License <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="mb-3 mt-3">
  <label for="oaInfoLicenseName" class="form-label">Name</label>
  <input type="text" class="form-control" id="oaInfoLicenseName" v-model="license.name" required>
</div>
<div class="mb-3 mt-3">
  <label for="oaInfoLicenseIdentifier" class="form-label"><a href="https://spdx.org/licenses/" target="_blank">Identifier</a></label>
  <input type="text" class="form-control" id="oaInfoLicenseIdentifier" v-model="license.identifier">
</div>
<div class="mb-3 mt-3">
  <label for="oaInfoLicenseUrl" class="form-label">URL</label>
  <input type="text" class="form-control" id="oaInfoLicenseUrl" v-model="license.url">
</div>


`
}
