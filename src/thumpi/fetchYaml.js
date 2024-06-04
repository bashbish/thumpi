import jsYaml from 'js-yaml'

const fetchYaml = async function (path, thumpi) {
  console.log('getting', path)
  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
      return response.text()
    })
    .then((data) => thumpi.getDocs().push(jsYaml.load(data)))
    .then(() => console.log('docs', thumpi.getDocs()))
    .catch((error) => console.error('There was a problem with the fetch operation:', error))
}

export default fetchYaml
