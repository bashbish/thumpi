import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import thumpi from './thumpi/thumpi.js'
import jsYaml from 'js-yaml'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const thumpiApp = createApp(App).use(router)
thumpiApp.config.globalProperties.$jsyamlLoad = jsYaml.load
thumpiApp.config.globalProperties.$jsyamldump = jsYaml.dump

thumpiApp.config.globalProperties.$thumpi = thumpi;
thumpiApp.provide('$thumpi', thumpiApp.config.globalProperties.$thumpi);
router.thumpi = thumpiApp.config.globalProperties.$thumpi;
thumpiApp.provide('bootstrap', bootstrap)
thumpiApp.mount('#app')
console.log('app mounted')
