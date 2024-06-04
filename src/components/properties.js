import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Trash from './icons/trash.js'
import Modal from './modal.js'
import AddMember from './addmember.js'
export default {
  components: { Edit, Uparrow, Trash, Modal, AddMember },

  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    add(name) {
      this.alert = undefined
      if (!name || name.trim().length === 0) {
        this.alert = 'A value is required'
        return
      }
      try {
        this.$thumpi.addProperty(this.$route, name)
        this.$forceUpdate()
        //this.toLink(this.$thumpi.baseLink(this.$route,'properties')+'/'+name);
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete() {
      this.alert = undefined
      this.$thumpi.deleteProperty(this.$route, this.target)
      this.$forceUpdate()
      this.target = undefined
    }
  },
  data() {
    return {
      properties: this.$thumpi.getProperties(this.$route),
      modalData: {
        title: 'Property',
        message: 'Delete Property?',
        close: 'Cancel',
        save: 'Delete'
      },
      target: undefined,
      alert: undefined,
      style: 'vrule'
    }
  },
  template: `
<div v-if="style==='vrule'">
    <span>Properties</span>
    <hr class="border border-primary opacity-25" >
</div>

<ul class="nav nav-pills nav-fill" v-if="style==='nav'">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Properties</a>
  </li>
</ul>
   
<add-member :memberLabel="'Property'" @member="add" class="my-3" ></add-member>
  <div class="alert alert-danger" role="alert" v-show="alert">
      {{ alert }}
  </div>
<ul class="list-group">
<li class="list-group-item list-group-item-action" ref="propItems" v-for="value, key in properties">
     <div class="d-flex align-items-center">
        <span @click="toLink($thumpi.baseLink($route,'properties')+'/'+encodeURIComponent(key))" class="me-auto"><Edit></Edit>&nbsp;{{ key }}</span>
        <button type="button" class="btn btn-sm btn-primary" @click="target=key" data-bs-toggle="modal" data-bs-target="#propertyDeleteModal"><Trash></Trash> Delete</button>
    </div>
  </li>
</ul>
<Modal #ref="deleteModal" class="modal fade" id="propertyDeleteModal" tabindex="-1" aria-labelledby="propertyDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>


`
}
