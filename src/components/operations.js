export default {
  emits: ['documents'],
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Operations</a>
  </li>
</ul>
<ul class="list-group">
  <li class="list-group-item list-group-item-action" @click="toLink('/server')">/path</li>
  <li class="list-group-item list-group-item-action" @click="toLink('/server')">/path</li>
</ul>
`
}
