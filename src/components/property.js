import Uparrow from './icons/uparrow.js'
import Enums from './enums.js'
export default {
  components: { Uparrow, Enums },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    },
    typeChange(event) {
      if (event.target.value === 'enum') {
        if (!this.property['enum']) {
          if (this.oldEnum) {
            this.property['enum'] = this.oldEnum
            this.oldEnum = undefined
          } else {
            this.property['enum'] = []
          }
        }
      } else {
        if (this.property['enum']) {
          this.oldEnum = this.property.enum
          delete this.property.enum
        }
      }
      this.showEnum = event.target.value === 'enum'
    }
  },
  data() {
    return {
      property: this.$thumpi.getProperty(this.$route),
      propi: this.$route.params.propi,
      showEnum: false,
      oldEnum: undefined
    }
  },
  beforeMount() {
    if (this.property['enum']) {
      this.showEnum = true
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink($thumpi.baseLink($route,'schema'))">Property <Uparrow></Uparrow></a>
  </li>
</ul>
<div class="my-3">
  <label for="propName" class="form-label">Name</label>
  <input type="text" class="form-control" id="propName" v-model="propi" disabled>
</div>
<div class="mb-3">
  <label for="propRef" class="form-label">$ref</label>
  <input type="text" class="form-control" id="propRef" v-model="property.$ref" >
</div>
<div class="mb-3">
  <label for="propType" class="form-label">Type</label>
  <input type="text" class="form-control" id="propType"  v-model="property.type" @change="typeChange">
</div>

<div class="row mb-3 d-flex justify-content-center align-items-center" v-if="showEnum">
    <div class="col-12">
        <label for="propType" class="form-label">Enum</label>
    </div>
    <div class="col-12" v-if="showEnum">
        <Enums :enumValues="property.enum" ></Enums>    
    </div>
</div>

<div class="mb-3">
  <label for="propItems" class="form-label">Items</label>
  <input type="text" class="form-control" id="propItems"v-model="property.items">
</div>

<div class="mb-3 mt-3">
  <label for="propFormat" class="form-label">Format</label>
  <input type="text" class="form-control" id="propFormat"  v-model="property.format">
</div>
<div class="mb-3 mt-3">
  <label for="propDesc" class="form-label">Description</label>
  <input type="text" class="form-control" id="propDesc" v-model="property.description" >
</div>
<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" value="" id="propNullable" v-model="property.nullable">
  <label class="form-check-label" for="propNullable">
    Nullable
  </label>
</div>
<div class="mb-3 mt-3">
  <label for="propMaxLength" class="form-label">Max Length</label>
  <input type="text" class="form-control" id="propMaxLength"v-model="property.maxLength">
</div>
`
}
