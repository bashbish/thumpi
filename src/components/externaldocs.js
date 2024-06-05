export default {
  emits: ['documents'],
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  data() {
    return {
      externalDocs: window.yamls[0].externalDocs
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" @click="toLink('/document')">External Documents</a>
  </li>
</ul>
<ul class="list-group">
  <li class="list-group-item" @click="toLink('/document')" v-for="edoc in externalDocs">{{edoc.description}}</li>
</ul>
`
}
