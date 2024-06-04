import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Trash from './icons/trash.js'
import Modal from './modal.vue'
import AddMember from './addmember.js'
import ThumpiItem from './thumpiitem.js'
import Alert from './alert.js'
export default {
  components: { Edit, Uparrow, Trash, Modal, AddMember, ThumpiItem, Alert },
  methods: {
    toLink(link) {
      this.$router.push(link)
    },
    add(tag) {
      this.alert = undefined
      if (!tag || tag.trim().length === 0) {
        this.alert = 'A value is required'
        return
      }
      try {
        this.$thumpi.addTag(this.$route, tag)
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onDelete() {
      this.alert = undefined
      this.$thumpi.deleteTag(this.$route, this.target)
      this.$forceUpdate()
      this.target = undefined
    },
    onTagTarget(targetTag) {
      this.target = targetTag
    }
  },
  data() {
    return {
      tags: this.$thumpi.getTags(this.$route),
      modalData: { title: 'Tag', message: 'Delete Tag?', close: 'Cancel', save: 'Delete' },
      target: undefined,
      alert: undefined
    }
  },
  template: `
<ul class="nav nav-pills nav-fill mb-3">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" @click="toLink($thumpi.baseLink($route,'doc'))">Tags <Uparrow></Uparrow></a>
  </li>
</ul>
<add-member :memberLabel="'Tag'"  @member="add"></add-member>
<Alert :alert="alert"></Alert>
<ul class="list-group mt-2">
    <li class="list-group-item list-group-item-action" v-for="value, index in tags" ><thumpi-item :toLink="$thumpi.baseLink($route,'tags')+'/'+encodeURIComponent(value.name)" :label="value.name" :modalId="'tagDeleteModal'" @delTarget="onTagTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
</ul>
<Modal #ref="deleteModal" class="modal fade" id="tagDeleteModal" tabindex="-1" aria-labelledby="tagDeleteModalLabel" aria-hidden="true" :title="modalData.title" :message="modalData.message" :close="modalData.close" :save="modalData.save" @delete="onDelete()"></Modal>
`
}
