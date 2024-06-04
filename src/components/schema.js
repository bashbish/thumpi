import Edit from './icons/edit.js'
import Uparrow from './icons/uparrow.js'
import SchemaFields from './schemafields.js'
import Alert from './alert.js'
import ThumpiHeader from './thumpiheader.vue'
import ThumpiItem from './thumpiitem.js'
import Modal from './modal.vue'
import Plus from './icons/plus.js'
export default {
  components: { Edit, Uparrow, SchemaFields, Alert, ThumpiHeader, ThumpiItem, Modal, Plus },
  methods: {
    toLink(link) {
      if (link === '#') {
        return
      }
      console.log(link)
      this.$router.push(link)
    },

    onTypeChange(event) {
      this.alert = undefined
      try {
        this.$thumpi.onSchemaTypeUpdate(this.$route, this.schemaFields, event.target.value)
        this.schema = this.$thumpi.getSchema(this.$route)
        this.schemaFields['properties'].enabled = event.target.value === 'object'
        this.schemaFields['items'].enabled = event.target.value === 'array'
        //this.$forceUpdate();
      } catch (e) {
        this.alert = e.message
      }
    },
    onNameChange() {
      this.alert = undefined
      if (this.$route.params.schemai !== this.schemai) {
        try {
          this.$thumpi.changeSchemaName(this.$route, this.schemai)
          this.$forceUpdate()
        } catch (e) {
          this.alert = e.message
        }
      }
    },
    onFieldUpdate(name, enabled) {
      this.alert = undefined
      console.log('onFieldUpdate', name, enabled)
      if (name === 'all') {
        Object.keys(this.schemaFields).forEach((k) => {
          if (k !== 'items') {
            this.schemaFields[k].enabled = enabled
          }
        })
        return
      }
      this.schemaFields[name].enabled = enabled
      if (name === '$ref' && enabled) {
        Object.keys(this.schemaFields).forEach((k) => {
          if (k !== '$ref') {
            this.schemaFields[k].enabled = false
          }
        })
      }
      this.schema['$ref'] = '#/components/schemas/'
    },
    addProperty() {
      this.alert = undefined
      console.log('addProperty', this.sProperty)
      try {
        this.$thumpi.addProperty(this.$route, this.sProperty)
        this.sProperty = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    addRequired() {
      this.alert = undefined
      console.log('addRequired', this.sRequired)
      try {
        this.$thumpi.addSchemaRequired(this.$route, this.sRequired)
        this.sRequired = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    addEnum() {
      this.alert = undefined
      console.log('addEnum', this.sEnum)
      try {
        this.$thumpi.addSchemaEnum(this.$route, this.sEnum)

        this.sEnum = undefined
        this.$forceUpdate()
      } catch (e) {
        this.alert = e.message
      }
    },
    onDeleteProperty() {
      this.alert = undefined
      try {
        this.$thumpi.deleteProperty(this.$route, this.targetProp)
        this.$forceUpdate()
        this.targetProp = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onPropertyTarget(targetProp) {
      this.targetProp = targetProp
    },
    onDeleteEnum() {
      this.alert = undefined
      try {
        this.$thumpi.deleteSchemaEnum(this.$route, this.targetEnum)
        this.$forceUpdate()
        this.targetEnum = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onEnumTarget(targetEnum) {
      this.targetEnum = targetEnum
    },
    onDeleteRequired() {
      this.alert = undefined
      try {
        console.log('delete', 'required', this.targetRequired)
        this.$thumpi.deleteSchemaRequired(this.$route, this.targetRequired)
        this.$forceUpdate()
        this.targetRequired = undefined
      } catch (e) {
        this.alert = e.message
      }
    },
    onRequiredTarget(targetRequired) {
      this.targetRequired = targetRequired
    },
    init(route) {
      if (Object.hasOwn(route.params, 'encodingi') && Object.hasOwn(route.params, 'headeri')) {
        this.backLink = this.$thumpi.baseLink(route, 'header')
        this.isArrayMemeber = false
      } else if (route.params.opi && route.params.parami) {
        this.backLink = this.$thumpi.baseLink(route, 'parameter')
        this.isArrayMemeber = false
      } else if (route.params.propi) {
        this.backLink = this.$thumpi.baseLink(route, 'schema')
      } else if (this.$route.fullPath.includes('components/parameters') && route.params.parami) {
        this.backLink = this.$thumpi.baseLink(route, 'parameter')
        this.isArrayMemeber = false
      } else if (Object.hasOwn(route.params, 'headeri')) {
        this.backLink = this.$thumpi.baseLink(route, 'header')
        this.isArrayMemeber = false
      } else if (Object.hasOwn(route.params, 'contenti')) {
        this.backLink = this.$thumpi.baseLink(route, 'contentitem')
        this.isArrayMemeber = false
      } else if (Object.hasOwn(route.params, 'pathi')) {
        this.backLink = this.$thumpi.baseLink(route, 'parameter')
        this.isArrayMemeber = false
      } else {
        this.backLink = this.$thumpi.baseLink(route, 'schemas')
      }
      this.schemaFields = this.$thumpi.schemaFields(Object.keys(this.schema))
      if (Object.hasOwn(this.schema, '$ref')) {
        this.schemaFields['type'].enabled = false
        return
      }
      if (Object.hasOwn(this.schema, 'type')) {
        if (this.schema['type'] === 'array') {
          this.schemaFields['items'].enabled = true
        }
        if (this.schema['type'] === 'object') {
          this.schemaFields['properties'].enabled = true
        }
      }
    }
  },
  data() {
    return {
      schema: this.$thumpi.getSchema(this.$route),
      schemai: this.$route.params.schemai,
      isArrayMemeber: true,
      alert: undefined,
      backLink: undefined,
      schemaFields: undefined,
      sProperty: undefined,
      sRequired: undefined,
      sEnum: undefined,
      modalPropertyData: {
        title: 'Properties',
        message: 'Delete Property?',
        close: 'Cancel',
        save: 'Delete'
      },
      modalRequiredData: {
        title: 'Required',
        message: 'Delete Required?',
        close: 'Cancel',
        save: 'Delete'
      },
      modalEnumData: { title: 'Enum', message: 'Delete Enum?', close: 'Cancel', save: 'Delete' },
      target: undefined,
      targetProp: undefined,
      targetEnum: undefined,
      targetRequired: undefined
    }
  },
  beforeMount() {
    // console.log("beforeMount", this.$route.fullPath);
    this.init(this.$route)
    // console.log(JSON.stringify('components from schema', this.$thumpi.getComponents(this.$route)));
  },
  watch: {
    // Watch for changes in the route
    $route(to, from) {
      // Call a method to refetch data or refresh the component
      this.schema = this.$thumpi.getSchema(to)
      if (to.params.propi) {
        this.schemai = to.params.propi
      } else {
        this.schemai = to.params.schemai
      }
      this.init(to)
      // this.$forceUpdate();
      // console.log('Route has changed, fetching new data!', to.fullPath);
    }
  },
  template: `
    <div>
    
    <thumpi-header :label="'Schema'" @back="toLink(backLink)"></thumpi-header>
 
    <Alert :alert="alert"></Alert>
    {{ schema }}
    <div><button class="btn btn-sm btn-primary mt-3" data-bs-toggle="collapse" data-bs-target="#schemaFieldList" aria-expanded="false" aria-controls="schemaFieldList">Schema Field Selectors</button></div>
    <hr class="border border-primary opacity-25" />
    
    <div class="mx-4 collapse" id="schemaFieldList">
        <span class="mb-3">{{ schema }}</span>
        <schema-fields :fields="schemaFields" @fieldEvent="onFieldUpdate"></schema-fields>
    </div>
    
    <div class="my-3" v-if="isArrayMemeber">
      <label for="schemaName" class="form-label">Name</label>
      <input type="text" class="form-control" aria-label="schemaName" aria-describedby="schemaName" v-model="schemai" @change="onNameChange" >
    </div>

    <div class="mb-3" v-if="schemaFields['type'].enabled">
      <label for="schemaType" class="form-label">Type</label>
      <select class="form-select" aria-label="schemaType" v-model="schema.type" @change="onTypeChange">  
        <option></option> 
        <option value="object">object</option>
        <option value="array">array</option>
        <option value="string">string</option>
        <option value="integer">integer</option>
        <option value="boolean">boolean</option>
        <option value="number">number</option>
      </select>
    </div>

    <div class="my-3" v-if="schemaFields['$ref'].enabled">
      <label for="schemaRef" class="form-label">$ref</label>
      <input type="text" class="form-control" aria-label="schemaRef" aria-describedby="schemaRef" v-model="schema.$ref">
    </div>

    <div class="my-3" v-if="schemaFields['items'].enabled">
      <label for="itemType" class="form-label">Item Type</label>
      <input type="text" class="form-control" aria-label="itemType" aria-describedby="itemType" v-model="schema.items.type">
    </div>

    <div class="my-3" v-if="schemaFields['format'].enabled">
      <label for="schemaFormat" class="form-label">Format</label>
      <input type="text" class="form-control" aria-label="schemaFormat" aria-describedby="schemaFormat" v-model="schema.format">
    </div>

    <div class="my-3"  v-if="schemaFields['description'].enabled">
      <label for="schemaDescription" class="form-label">Description</label>
      <textarea class="form-control" aria-label="schemaDescription" aria-describedby="schemaDescription" v-model="schema.description"></textarea>
    </div>

    <div class="my-3" v-if="schemaFields['default'].enabled">
      <label for="schemaDefault" class="form-label">Default</label>
      <input type="text" class="form-control" aria-label="schemaDefault" aria-describedby="schemaDefault" v-model="schema.default">
    </div>
    
    <div class="my-3"  v-if="schemaFields['example'].enabled">
        <label for="schemaExample" class="form-label">Example</label>
        <textarea class="form-control" id="schemaExample" rows="4"  aria-describedby="schemaExample" v-model="schema.example"></textarea>
    </div>
    
    <div class="form-check mb-3" v-if="schemaFields['nullable'].enabled">
        <input class="form-check-input" type="checkbox" value="" id="schemaNullable" v-model="schema.nullable">
        <label class="form-check-label" for="schemaNullable">
            Nullable
        </label>
    </div>

    <div class="my-3"  v-if="schemaFields['minimum'].enabled">
      <label for="schemaMinimum" class="form-label">Minimum</label>
      <input type="number" class="form-control" aria-label="schemaMinimum" aria-describedby="schemaMinimum" v-model="schema.minimum">
    </div>

    <div class="my-3" v-if="schemaFields['maximum'].enabled">
      <label for="schemaMaximum" class="form-label">Maximum</label>
      <input type="number" class="form-control" aria-label="schemaMaximum" aria-describedby="schemaMaximum" v-model="schema.maximum">
    </div>

    <div class="my-3" v-if="schemaFields['minLength'].enabled">
      <label for="schemaMinLength" class="form-label">Min Length</label>
      <input type="number" class="form-control" aria-label="schemaMinLength" aria-describedby="schemaMinLength" v-model="schema.minLength">
    </div>

    <div class="my-3" v-if="schemaFields['maxLength'].enabled">
      <label for="schemaMaxLength" class="form-label">Max Length</label>
      <input type="number" class="form-control" aria-label="schemaMaxLength" aria-describedby="schemaMaxLength" v-model="schema.maxLength">
    </div>

    <div class="form-check mb-3" v-if="schemaFields['readOnly'].enabled">
      <input class="form-check-input" type="checkbox" value="" id="schemaReadOnly" v-model="schema.readOnly">
      <label class="form-check-label" for="schemaReadOnly">
        Read Only
      </label>
    </div>
    
    <div class="form-check mb-3" v-if="schemaFields['deprecated'].enabled">
      <input class="form-check-input" type="checkbox" value="" id="schemaDeprecated" v-model="schema.deprecated">
      <label class="form-check-label" for="schemaDeprecated">
        Deprecated
      </label>
    </div>

    <div class="my-3" v-if="schemaFields['pattern'].enabled">
      <label for="schemaPattern" class="form-label">Pattern</label>
      <input type="text" class="form-control" aria-label="schemaPattern" aria-describedby="schemaPattern" v-model="schema.pattern">
    </div>

    <div class="my-3" v-if="schemaFields['title'].enabled">
      <label for="schemaTitle" class="form-label">Title</label>
      <input type="text" class="form-control" aria-label="schemaTitle" aria-describedby="schemaTitle" v-model="schema.title">
    </div>    
    
    
   <div v-if="schemaFields['enum'].enabled" class="mb-3">
        <div class="d-flex align-items-center" >
            <label class="me-auto" >Enums</label>
            <div class="row g-3 d-flex justify-content-center mb-3">
              <div class="col-auto">
                <label for="schemaEnum" class="visually-hidden">Enum</label>
                <input type="text" class="form-control" aria-label="schemaEnum" aria-describedby="schemaEnum" v-model="sEnum">
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary" @click="addEnum()"><Plus></Plus></button>
              </div>
          </div>
        </div>
    
        <ul class="list-group mt-2">
            <li class="list-group-item list-group-item-action" v-for="value, index in schema.enum" ><thumpi-item :toLink="'#'" :label="value" :modalId="'deleteEnumModal'" @delTarget="onEnumTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
        </ul>
        <Modal #ref="deleteEnumModal" class="modal fade" id="deleteEnumModal" tabindex="-1" aria-labelledby="deleteEnumModalLabel" aria-hidden="true" :title="modalEnumData.title" :message="modalEnumData.message" :close="modalEnumData.close" :save="modalEnumData.save" @delete="onDeleteEnum()"></Modal>
    </div>
    
    
    <div v-if="schemaFields['required'].enabled" class="mb-3">
        <div class="d-flex align-items-center" >
            <label class="me-auto" >Required</label>
            <div class="row g-3 d-flex justify-content-center mb-3">
              <div class="col-auto">
                <label for="schemaRequired" class="visually-hidden">Property</label>
                <input type="text" class="form-control" aria-label="schemaRequired" aria-describedby="schemaProperty" v-model="sRequired">
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary" @click="addRequired()"><Plus></Plus></button>
              </div>
          </div>
        </div>
    
        <ul class="list-group mt-2">
            <li class="list-group-item list-group-item-action" v-for="value, index in schema.required" ><thumpi-item :toLink="'#'" :label="value" :modalId="'deleteRequiredModal'" @delTarget="onRequiredTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
        </ul>
        <Modal #ref="deleteRequiredModal" class="modal fade" id="deleteRequiredModal" tabindex="-1" aria-labelledby="deletePropertyModalLabel" aria-hidden="true" :title="modalRequiredData.title" :message="modalRequiredData.message" :close="modalRequiredData.close" :save="modalRequiredData.save" @delete="onDeleteRequired()"></Modal>
    </div>
    

    <div v-if="schemaFields['properties'].enabled">
        <div class="d-flex align-items-center" >
            <label class="me-auto" >Properties</label>
            <div class="row g-3 d-flex justify-content-center mb-3">
              <div class="col-auto">
                <label for="schemaProperty" class="visually-hidden">Property</label>
                <input type="text" class="form-control" aria-label="schemaProperty" aria-describedby="schemaProperty" v-model="sProperty">
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary" @click="addProperty()"><Plus></Plus></button>
              </div>
          </div>
        </div>
    
        <ul class="list-group mt-2">
            <li class="list-group-item list-group-item-action" v-for="value, key in schema.properties" ><thumpi-item :toLink="$thumpi.baseLink($route,'schema')+'/properties/'+encodeURIComponent(key)" :label="key" :modalId="'deletePropertyModal'" @delTarget="onPropertyTarget" @toLink="toLink" :action="'trash'"></thumpi-item></li>
        </ul>
        <Modal #ref="deletePropertyModal" class="modal fade" id="deletePropertyModal" tabindex="-1" aria-labelledby="deletePropertyModalLabel" aria-hidden="true" :title="modalPropertyData.title" :message="modalPropertyData.message" :close="modalPropertyData.close" :save="modalPropertyData.save" @delete="onDeleteProperty()"></Modal>
    </div>
</div>
  `
}
