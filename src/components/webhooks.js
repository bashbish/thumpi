export default {
  methods: {
    toLink(link) {
      this.$router.push(link)
    }
  },
  data() {
    return {
      webhooks: this.$thumpi.getDocs()[this.$route.params.doci].webhooks,
      doci: this.$route.params.doci
    }
  },
  template: `
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" @click="toLink('/documents/'+doci)">Webhooks</a>
  </li>
</ul>

`
}
