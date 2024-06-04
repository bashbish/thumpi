import Navbar from './navbar.js'
import { RouterView } from 'vue-router'
export default {
  components: { Navbar },
  template: `
<Navbar></Navbar>   
<div class="container">
    <div class="row">
        <div class="col">
            <RouterView />
        </div>
    </div>
</div>`
}
