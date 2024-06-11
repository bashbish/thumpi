import Uparrow from './icons/uparrow.js'
import Downarrow from './icons/downarrow.js'
import Alert from './alert.js'
import ThumpiHeader from './thumpiheader.vue'
import Modal from './modal.vue'
import Trash from './icons/trash.vue'
import ThumpiItem from './thumpiitem.js'
import Plus from './icons/plus.vue'
export default {
  components: { Uparrow, Downarrow, Alert, ThumpiHeader, ThumpiItem, Trash, Modal, Plus },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push({path:link, force:true})
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
    },
    updateSecurityRequirementName() {
      try {
        this.$thumpi.updateSecurityRequirementName(this.$route, this.$route.params.seci, this.name);
        this.toLink(this.$thumpi.baseLink(this.$route,'security')+'/'+encodeURIComponent(this.name))
      } catch ( err ){
        this.alert = err.message;
      }
    },
    onBack() {
      this.toLink(this.backLink);
    },
    addScope() {
      try {
        this.$thumpi.addScope(this.$route, this.secReqScope);
        this.toLink(this.$thumpi.baseLink(this.$route,'security')+'/'+encodeURIComponent(this.name))
        this.secReqScope = undefined;
      } catch ( err ) {
        this.alert = err.message;
      }
    },
    onScopeTarget(scope) {
      this.scopeTarget = scope;
    },
    onDeleteScope() {
      console.log('onScopeTargetonDeleteScope',this.scopeTarget);
      this.$thumpi.deleteSecurityRequirementScope(this.$route, this.scopeTarget);
      //this.scopes = this.$thumpi.getSecurityRequirement(this.$route)[this.$route.params.seci];
      this.toLink(this.$thumpi.baseLink(this.$route,'security')+'/'+encodeURIComponent(this.name))
    },
    onEnterScope() {
      this.$refs.addScopeButton.click()
    }
  },
  watch: {
    '$route': function (to, from) {
      this.$thumpi.params(this.$route);
      console.log('watch hit');
      this.security = this.$thumpi.getSecurityRequirement(to);
      this.scopes = this.$thumpi.getSecurityRequirement(to)[to.params.seci]
      this.name = to.params.seci;
    },
    'security': {
      handler(val) {
        console.log('security watcher triggered');
      },
      deep: true,
    }
  },
  data() {
    return {
      security: this.$thumpi.getSecurityRequirement(this.$route),
      scopes : this.$thumpi.getSecurityRequirement(this.$route)[this.$route.params.seci],
      name : this.$route.params.seci,
      securityType: undefined,
      alert: undefined,
      backLink : this.$thumpi.baseLink(this.$route, 'security'),
      secReqScope:undefined,
      modalScopeData: { title: 'Scopes', message: 'Delete Scope?', close: 'Cancel', save: 'Delete' },
      scopeTarget:undefined,
      flag: false,
    }
  },
  template: `

    <thumpi-header :label="'Security Requirement'" @back="onBack"></thumpi-header>
    {{ security }}  {{ name }}
    <Alert :alert="alert"></Alert>

    <div class="mb-3 mt-3">
      <label for="seci" class="form-label">Name</label>
      <input type="text" class="form-control" id="seci" aria-describedby="seci" v-model="name" @change="updateSecurityRequirementName">
    </div>


    <div class="mb-3">
      <div class="d-flex align-items-center" >
        <label class="me-auto" >Scopes</label>
        <div class="row g-3 d-flex justify-content-center mb-3">
          <div class="col-auto">
            <label for="securityScope" class="visually-hidden">Scopes</label>
            <input type="text" class="form-control" aria-label="securityScope" aria-describedby="securityScope" v-model="secReqScope" @keyup.enter="onEnterScope">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary" @click="addScope()" ref="addScopeButton"><Plus></Plus></button>
          </div>
        </div>
      </div>
      <ul class="list-group mt-2">
        <li class="list-group-item list-group-item-action" v-for="value, index in scopes" ><thumpi-item :toLink="$thumpi.baseLink($route,'security')+'/'+encodeURIComponent(value)" :label="value" :modalId="'deleteScopeModal'" @delTarget="onScopeTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
      </ul>
      <Modal #ref="deleteScopeModal" class="modal fade" id="deleteScopeModal" tabindex="-1" aria-labelledby="deleteScopeModalLabel" aria-hidden="true" :title="modalScopeData.title" :message="modalScopeData.message" :close="modalScopeData.close" :save="modalScopeData.save" @delete="onDeleteScope()"></Modal>
    </div>
    
`
}
