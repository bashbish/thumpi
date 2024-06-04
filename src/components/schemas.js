import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Trash from './icons/trash.js'
import Modal from './modal.vue'
import AddMember from './addmember.js'
import Alert from './alert.js'
import ThumpiItem from './thumpiitem.js'
import ThumpiHeader from './thumpiheader.vue'
export default {
  components: { Edit, Uparrow, Trash, Modal, AddMember, Alert, ThumpiItem, ThumpiHeader },
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
        this.$thumpi.addSchema(this.$route, name)
        this.$forceUpdate()
        console.log('schema after', name, JSON.stringify(this.$thumpi.getSchemas(this.$route).keys))
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete() {
      this.alert = undefined
      this.$thumpi.deleteSchema(this.$route, this.target)
      this.$forceUpdate()
      this.target = undefined
    }
  },
  data() {
    return {
      schemas: this.$thumpi.getSchemas(this.$route),
      modalData: { title: 'Schema', message: 'Delete Schema?', close: 'Cancel', save: 'Delete' },
      target: undefined,
      alert: undefined,
      backLink: this.$thumpi.baseLink(this.$route, 'components'),
      header: 'Schemas'
    }
  },
  template: `

<thumpi-header :label="header" @back="toLink(backLink)"></thumpi-header>
<add-member :memberLabel="'Schema'" :placeholder="undefined" @member="add" class="my-3"></add-member>
    
<Alert :alert="alert"></Alert>
  
<ul class="list-group">
    <li class="list-group-item list-group-item-action" v-for="value, key in schemas">
        <thumpi-item :label="key" :action="'trash'" :toLink="$thumpi.baseLink($route,'schemas')+'/'+encodeURIComponent(key)" @toLink="toLink" :modalId="'schemaDeleteModal'" @delTarget="target=key"></thumpi-item>
    </li>
</ul>

<Modal #ref="deleteModal" class="modal fade" id="schemaDeleteModal" tabindex="-1" aria-labelledby="schemaDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>


`
}
