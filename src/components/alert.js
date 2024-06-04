export default {
  props: ['alert'],
  template: `
<div className="alert alert-danger my-3"  role="alert" v-show="alert">
    {{alert}}
</div>`
}
