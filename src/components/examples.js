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
        this.$thumpi.addExample(this.$route, name)
        this.$forceUpdate()
        console.log(
          'example after',
          name,
          JSON.stringify(this.$thumpi.getExamples(this.$route).keys)
        )
      } catch (e) {
        console.log(e)
        this.alert = e.message
      }
    },
    onDelete() {
      this.alert = undefined
      this.$thumpi.deleteExample(this.$route, this.target)
      this.$forceUpdate()
      this.target = undefined
    }
  },
  data() {
    return {
      examples: this.$thumpi.getExamples(this.$route),
      modalData: { title: 'Example', message: 'Delete Example?', close: 'Cancel', save: 'Delete' },
      target: undefined,
      alert: undefined,
      backLink: this.$thumpi.baseLink(this.$route, 'components'),
      header: 'Examples'
    }
  },
  template: `

<thumpi-header :label="header" @back="toLink(backLink)"></thumpi-header>
<add-member :memberLabel="'Example'" :placeholder="undefined" @member="add" class="my-3"></add-member>
    
<Alert :alert="alert"></Alert>
  
<ul class="list-group">
    <li class="list-group-item list-group-item-action" v-for="value, key in examples">
        <thumpi-item :label="key" :action="'trash'" :toLink="$thumpi.baseLink($route,'examples')+'/'+encodeURIComponent(key)" @toLink="toLink" :modalId="'exampleDeleteModal'" @delTarget="target=key"></thumpi-item>
    </li>
</ul>

<Modal #ref="deleteModal" class="modal fade" id="exampleDeleteModal" tabindex="-1" aria-labelledby="example DeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>


`
}
