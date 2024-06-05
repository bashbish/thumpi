import Plus from './icons/plus.js'
import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import Alert from './alert.js'
export default {
  components: { Edit, Plus, Uparrow, Alert },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    updateTagName() {
      this.alert = undefined
      if (this.tagName != this.params.tagi) {
        if (this.tagName && this.tagName.trim().length > 0) {
          try {
            this.tag = this.$thumpi.updateTagName(this.$route, this.tagName)
            this.$forceUpdate()
          } catch (e) {
            this.alert = e.message
          }
        } else {
          this.alert = 'tag name is invalid'
        }
      }
    },
    get() {
      const tags = this.$thumpi.getTag(this.$route)
      return tags
    }
  },
  data() {
    return {
      tag: this.get(),
      tagName: this.$route.params.tagi,
      alert: undefined
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink($thumpi.baseLink($route,'tags'))">Tag <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="mb-3 mt-3">
  <label for="tagName" class="form-label">Name</label>
  <input type="text" class="form-control" id="tagName"  v-model="tagName" @change="updateTagName()">
</div>
<Alert :alert="alert"></Alert>
<div class="mb-3">
  <label for="tagDesc" class="form-label">Description</label>
  <textarea class="form-control" id="tagDesc" rows="4" v-model="tag.description"></textarea>
</div>
<ul class="list-group">
  <li class="list-group-item" @click="toLink($thumpi.baseLink($route,'tag')+'/externalDocs')"><Edit></Edit> External Docs</li> 
</ul>
`
}
