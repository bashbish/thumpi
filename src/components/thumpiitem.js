import Edit from './icons/edit.js'
import Trash from './icons/trash.js'
import Plus from './icons/plus.js'
export default {
  components: { Edit, Trash, Plus },
  props: {
    toLink: { type: String, default: 'missing' },
    label: { type: String, default: 'missing' },
    modalId: { type: String, default: "'noop" },
    action: { type: String, default: 'edit' }
  },
  emits: ['delTarget', 'toLink'],
  template: `
<div class="d-flex align-items-center">
    <button class="btn btn-sm btn-outline-primary me-auto px-2" type="button" @click="$emit('toLink',toLink)" >
        <span v-if="action==='plus'"><Plus></Plus></span>
        <span v-if="action==='edit'"><Edit></Edit></span>
        &nbsp;{{label}}
    </button>
    <button v-if="action==='trash'" type="button" class="btn btn-sm btn-primary" @click="$emit('delTarget', label)" :data-bs-toggle="(action === 'trash' ? 'modal' : null)" :data-bs-target="action === 'trash' ? ('#'+modalId) : null"><span><Trash></Trash></span></button>
</div>`
}
