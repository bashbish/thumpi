import Uparrow from './icons/uparrow.js'
import Downarrow from './icons/downarrow.js'
import Edit from './icons/edit.js'
import Trash from './icons/trash.js'
import Modal from './modal.vue'
import ThumpiHeader from './thumpiheader.vue'
export default {
  components: { Uparrow, Downarrow, Edit, Trash, Modal, ThumpiHeader },
  methods: {
    toLink(link) {
      console.log(link)

      this.$router.push(link)
    },
    addSecurityRequirement() {
      this.alert = undefined
      if (!this.securityRequirement || this.securityRequirement.trim() === '') {
        this.alert = 'Type is required'
        return
      }
      try {
        this.$thumpi.addSecurityRequirement(this.$route, this.securityRequirement)
        this.$forceUpdate();
      } catch (e) {
        console.log(e)
        this.alert = e.message
      }
    },
    onDelete() {
      this.securities.splice(this.target, 1)
      this.target = -1
      this.$forceUpdate()
    }
  },
  data() {
    return {
      securities: this.$thumpi.getSecurities(this.$route),
      securityRequirement: undefined,
      alert: undefined,
      modalData: {
        title: 'Securities',
        message: 'Delete Security?',
        close: 'Cancel',
        save: 'Delete'
      },
      target: -1,
      header: 'Security',
      backLink: this.$thumpi.baseLink(this.$route, 'operation'),
    }
  },
  template: `

<thumpi-header :label="header" @back="toLink(backLink)"></thumpi-header>
{{ securities }}
  <div class="row g-3 d-flex justify-content-center align-items-center my-2">
    <div class="col-auto">
    Type
    </div>
      <div class="col-auto">
        <label for="secType" class="visually-hidden">Security Type</label>
        <select class="form-select" id="secType" aria-label="Security Type" v-model="securityRequirement">  
          <option value="apiKey">apiKey</option>  
          <option value="http">http</option>
          <option value="oauth2">oauth2</option>
          <option value="openIdConnect">openIdConnect</option>
        </select>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary" @click="addSecurityRequirement()">Add</button>
      </div>
  </div>
  <div class="alert alert-danger" role="alert" v-show="alert">
      {{ alert }}
   </div>


<ul class="list-group">
  <li class="list-group-item list-group-item-action"  v-for="value, index in securities">
    <div class="d-flex align-items-center">
        <button class="btn btn-link me-auto" type="button" @click="toLink($thumpi.baseLink($route,'security')+'/'+encodeURIComponent(Object.keys(value)[0]))" ><Edit></Edit>&nbsp;{{ Object.keys(value)[0] }}</button>
        <button type="button" class="btn btn-sm btn-primary" @click="target=index" data-bs-toggle="modal" data-bs-target="#secDeleteModal"><Trash></Trash></button>
    </div>
  </li>
</ul>
<Modal #ref="deleteModal" class="modal fade" id="secDeleteModal" tabindex="-1" aria-labelledby="secDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>

`
}
