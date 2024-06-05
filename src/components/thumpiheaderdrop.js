//import Uparrow from './icons/uparrow.js';
import Downarrow from './icons/downarrow.js'
export default {
  components: { Downarrow },
  emits: ['back'],
  props: {
    label: { type: String, default: 'missing' },
    backImg: { type: String, default: 'downarrow' }
  },
  template: `
<ul class="nav nav-pills nav-fill mb-3">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="$emit('back')">{{ label }}&nbsp;<Uparrow></Uparrow></a>
  </li>
</ul>
<ul class="nav nav-pills nav-fill">
  <li class="nav-item" >
    <a class="nav-link active" aria-current="page" data-bs-toggle="collapse" data-bs-target="#addDocCard" aria-expanded="false" aria-controls="addDocCard">{{ label }} <Downarrow></Downarrow></a>
  </li>
</ul>
`
}
