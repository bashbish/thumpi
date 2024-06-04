import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import createThumpi from './thumpi/thumpi.js'
import jsYaml from 'js-yaml'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const thumpiApp = createApp(App).use(router)
thumpiApp.config.globalProperties.$jsyamlLoad = jsYaml.load
thumpiApp.config.globalProperties.$jsyamldump = jsYaml.dump
thumpiApp.provide('$thumpi', createThumpi())

thumpiApp.config.globalProperties.$thumpi = createThumpi()
thumpiApp.provide('$thumpi', thumpiApp.config.globalProperties.$thumpi)
thumpiApp.provide('bootstrap', bootstrap)
thumpiApp.mount('#app')
console.log('thumpi loaded')
