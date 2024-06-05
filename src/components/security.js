import Uparrow from './icons/uparrow.js'
import Downarrow from './icons/downarrow.js'
export default {
  components: { Uparrow, Downarrow },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    addSecurityType() {
      this.alert = undefined
      try {
        this.$thumpi.addSecurityType(this.$route, this.securityType)
        this.toLink(this.$thumpi.baseLink(this.$route, 'security') + '/' + this.securityType)
      } catch (e) {
        console.log(e)
        this.alert = e.message
      }
    }
  },
  data() {
    return {
      security: this.$thumpi.getSecurity(this.$route),
      securityType: undefined,
      alert: undefined
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink($thumpi.baseLink($route, 'doc'))">Security <Uparrow></Uparrow></a>
  </li>
</ul>

<ul class="nav nav-pills nav-fill mb-3">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" data-bs-toggle="collapse" data-bs-target="#addSecCard" aria-expanded="false" aria-controls="addSecCard">Security <Downarrow></Downarrow></a>
  </li>
</ul>
"apiKey", "http", "oauth2", "openIdConnect"
  <div class="collapse" id="addSecCard">
  <div class="row g-3 d-flex justify-content-center my-2">
      <div class="col-auto">
        <label for="secType" class="visually-hidden">Security Type</label>
        <select class="form-select" id="opAction" aria-label="Security Type" v-model="securityType">  
          <option value="apiKey">apiKey</option>  
          <option value="http">http</option>
          <option value="oauth2">oauth2</option>
          <option value="openIdConnect">openIdConnect</option>
        </select>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3" @click="addSec()">Add</button>
      </div>
  </div>
  <div class="alert alert-danger" role="alert" v-show="alert">
      {{ alert }}
   </div>
</div>

`
}
