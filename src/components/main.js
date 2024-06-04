import { createApp } from 'vue'
import index from '../router/index.js'
import App from './app.js'
import createThumpi from './thumpi/thumpi.js'

const fetchYaml = async function (path) {
  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
      return response.text()
    })
    .then((data) => thumpiApp.config.globalProperties.$thumpi.getDocs().push(jsyaml.load(data)))
    .catch((error) => console.error('There was a problem with the fetch operation:', error))
}

const thumpiApp = createApp(App).use(index)
thumpiApp.config.globalProperties.$fetchYaml = fetchYaml
thumpiApp.config.globalProperties.$jsyamlLoad = jsyaml.load
thumpiApp.config.globalProperties.$jsyamldump = jsyaml.dump
thumpiApp.config.globalProperties.$thumpi = createThumpi()
thumpiApp.mount('#app')
console.log('thumpi loaded')

index.beforeEach((to, from) => {
  thumpiApp.config.globalProperties.$thumpi.saveDocs()
})

fetchYaml('./js/samples/petstore.yaml')
