import ThumpiHeader from './thumpiheader.vue'

export default {
  components: { ThumpiHeader },
  methods: {
    toLink(link) {
      console.log(link)
      this.$router.push(link)
    }
  },
  data() {
    return {
      contact: this.$thumpi.getContact(this.$route),
      label: 'Contact',
      upLink: this.$thumpi.baseLink(this.$route, 'info')
    }
  },
  template: `
<thumpi-header :label="label" @back="toLink(upLink)"></thumpi-header>
<div class="mb-3 mt-3">
  <label for="oaInfoContactName" class="form-label">Name</label>
  <input type="text" class="form-control" id="oaInfoContactName" v-model="contact.name">
</div>
<div class="mb-3 mt-3">
  <label for="oaInfoContactURL" class="form-label">URL</label>
  <input type="text" class="form-control" id="oaInfoContactURL" v-model="contact.url">
</div>
<div class="mb-3 mt-3">
  <label for="oaInfoContactEmail" class="form-label">Email</label>
  <input type="email" class="form-control" id="oaInfoContactEmail" v-model="contact.email">
</div>

`
}
