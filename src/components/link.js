export default {
  methods: {
    toLink() {
      this.$router.push('/')
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page">Link</a>
  </li>
</ul>

`
}
