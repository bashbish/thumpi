// links

const baseLink = ($route, level) => {
  var result = undefined;
  switch (level) {
    case 'doc': {
      result =  '/documents/' + $route.params.doci;
      break;
    }
    case 'document': {
      result =  '/documents/' + $route.params.doci
      break;
    }
    case 'documents': {
      result =  '/documents'
      break;
    }
    case 'info': {
      result =  '/documents/' + $route.params.doci + '/info'
      break;
    }
    case 'webhooks': {
      result =  '/documents/' + $route.params.doci + '/webhooks'
      break;
    }
    case 'security': {
      if ( Object.hasOwn($route.params, 'opi')) {
        result =  '/documents/' + encodeURIComponent($route.params.doci) + '/paths/' + encodeURIComponent($route.params.pathi) + '/operations/' + encodeURIComponent($route.params.opi) + '/security';
        break;
      }
      result =  '/documents/' + $route.params.doci + '/security'
      break;
    }
    case 'externaldocs': {
      if ($route.params.tagi) {
        const docLink = '/documents/' + $route.params.doci
        result =  docLink + '/tags/' + $route.params.tagi + '/externaldocs'
        break;
      } else {
        result =  '/documents/' + $route.params.doci + '/externaldocs'
        break;
      }
    }
    case 'components': {
      result =  '/documents/' + $route.params.doci + '/components'
      break;
    }
    case 'servers': {
      if ($route.params.opi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/servers'
        break;
      } else if ($route.params.pathi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        result =  pathLink + '/servers'
        break;
      } else {
        result =  '/documents/' + $route.params.doci + '/servers'
        break;
      }
    }
    case 'paths': {
      const docLink = '/documents/' + $route.params.doci
      result =  docLink + '/paths'
      break;
    }
    case 'path': {
      const docLink = '/documents/' + $route.params.doci
      result =  docLink + '/paths/' + encodeURIComponent($route.params.pathi)
      break;
    }
    case 'operations': {
      const docLink = '/documents/' + $route.params.doci
      const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
      result =  pathLink + '/operations'
      break;
    }
    case 'operation': {
      const docLink = '/documents/' + $route.params.doci
      const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
      result =  pathLink + '/operations/' + encodeURIComponent($route.params.opi)
      break;
    }
    case 'parameters': {
      console.log(
        'parameters link:',
        $route.params,
        $route.fullPath,
        $route.fullPath.includes('components')
      )
      if ($route.fullPath.includes('components')) {
        const docLink = '/documents/' + $route.params.doci
        result =  docLink + '/components/parameters'
        break;
      } else if ($route.params.opi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/parameters'
        break;
      } else if ($route.params.pathi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        result =  pathLink + '/parameters'
        break;
      }
    }
    case 'parameter': {
      if (Object.hasOwn($route.params, 'opi')) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/parameters/' + $route.params.parami
        break;
      } else if (Object.hasOwn($route.params, 'pathi')) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        result =  pathLink + '/parameters/' + $route.params.parami
        break;
      } else if ($route.fullPath.includes('components')) {
        const docLink = '/documents/' + $route.params.doci
        const compLink = docLink + '/components/parameters'
        result =  compLink + '/' + encodeURIComponent($route.params.parami)
        break;
      }
      throw new Error('could not determine parameter source link')
    }
    case 'tags': {
      const docLink = '/documents/' + $route.params.doci
      result =  docLink + '/tags'
      break;
    }
    case 'tag': {
      const docLink = '/documents/' + $route.params.doci
      result =  docLink + '/tags/' + $route.params.tagi
      break;
    }
    case 'securities': {
      const docLink = '/documents/' + $route.params.doci
      result =  docLink + '/security'
      break;
    }
    case 'schemas': {
      const docLink = '/documents/' + $route.params.doci

      if ($route.fullPath.includes('components')) {
        result =  docLink + '/components/schemas'
        break;
      }
    }
    case 'schema': {
      const docLink = '/documents/' + encodeURIComponent($route.params.doci)
      if (Object.hasOwn($route.params, 'encodingi') && Object.hasOwn($route.params, 'headeri')) {
        const path = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const op = path + '/operations/' + encodeURIComponent($route.params.opi)
        const response = op + '/responses/' + encodeURIComponent($route.params.responsei)
        const contentitem = response + '/content/' + encodeURIComponent($route.params.contenti)
        const encoding = contentitem + '/encoding/' + encodeURIComponent($route.params.encodingi)
        const header = encoding + '/headers/' + encodeURIComponent($route.params.headeri)
        result =  header + '/schema'
        break;
      } else if (
        Object.hasOwn($route.params, 'pathi') &&
        Object.hasOwn($route.params, 'parami') & !Object.hasOwn($route.params, 'opi')
      ) {
        // documents/:doci/paths/:pathi/parameters/:parami/schema
        result =  (
          docLink +
          '/paths/' +
          encodeURIComponent($route.params.pathi) +
          '/parameters/' +
          encodeURIComponent($route.params.parami) +
          '/schema'
        )
        break;
      } else if (
        $route.fullPath.includes('components/parameters') &&
        Object.hasOwn($route.params, 'parami')
      ) {
        result =  docLink + '/components/parameters/' + $route.params.parami + '/schema'
        break;
      } else if (Object.hasOwn($route.params, 'examplei')) {
        result =  (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          $route.params.contenti +
          '/examples/' +
          $route.params.examplei +
          '/schema'
        )
        break;
      } else if ($route.fullPath.includes('components/schemas')) {
        result =  docLink + '/components/schemas/' + $route.params.schemai
        break;

      } else if ($route.fullPath.includes('components/headers')) {
        result =  docLink + '/components/headers/' + $route.params.headeri + '/schema'
        break;
      } else if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'parami')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const paramLink = opLink + '/parameters/' + $route.params.parami
        result =  paramLink + '/schema'
        break;
      }
    }
    case 'properties': {
      const docLink = '/documents/' + $route.params.doci
      if ($route.fullPath.includes('components')) {
        const schemaiLink = docLink + '/components/schemas/' + $route.params.schemai
        result =  schemaiLink + '/properties'
        break;
      }
    }
    case 'server': {
      if (Object.hasOwn($route.params, 'opi')) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/servers/' + encodeURIComponent($route.params.servi)
        break;
      }
      const docLink = '/documents/' + $route.params.doci
      result =  docLink + '/servers/' + encodeURIComponent($route.params.servi)
      break;
    }
    case 'responses': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/responses'
        break;
      }
      if ($route.fullPath.includes('components')) {
        result =  docLink + '/components/responses'
        break;
      }
    }
    case 'response': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/responses/' + encodeURIComponent($route.params.responsei)
        break;
      }
      if ($route.fullPath.includes('components')) {
        result =  docLink + '/components/responses/' + $route.params.responsei
        break;
      }
    }
    case 'content': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/responses/' + encodeURIComponent($route.params.responsei)
        break;
      }
      if ($route.fullPath.includes('components/responses')) {
        result =  docLink + '/components/responses/' + $route.params.responsei
        break;
      }
    }
    case 'contentitem': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'responsei')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  (
          opLink +
          '/responses/' +
          encodeURIComponent($route.params.responsei) +
          '/content/' +
          encodeURIComponent($route.params.contenti)
        )
        break;
      } else if (Object.hasOwn($route.params, 'opi') && $route.fullPath.includes('/requestBody')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        result =  opLink + '/requestBody/content/' + encodeURIComponent($route.params.contenti)
        break;
      } else if ($route.fullPath.includes('components')) {
        result =  (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          encodeURIComponent($route.params.contenti)
        )
        break;
      }
    }
    case 'examples': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'responsei')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const contentLink =
          opLink +
          '/responses/' +
          encodeURIComponent($route.params.responsei) +
          '/content/' +
          $route.params.contenti
        result =  contentLink + '/examples'
        break;
      } else if (Object.hasOwn($route.params, 'opi') && $route.fullPath.includes('/requestBody')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const contentLink = opLink + '/requestBody/content/' + $route.params.contenti
        result =  contentLink + '/examples'
        break;
      } else if ($route.fullPath.includes('/components/responses/')) {
        result =  (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          $route.params.contenti +
          '/examples'
        )
        break;
      } else if ($route.fullPath.includes('/components')) {
        result =  docLink + '/components/examples'
        break;
      }
    }
    case 'example': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi') && $route.fullPath.includes('/requestBody')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const contentLink = opLink + '/requestBody/content/' + $route.params.contenti
        result =  contentLink + '/examples' + $route.params.examplei
        break;
      } else if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'responsei')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const contentLink =
          opLink +
          '/responses/' +
          encodeURIComponent($route.params.responsei) +
          '/content/' +
          $route.params.contenti
        result =  contentLink + '/examples/' + $route.params.examplei
        break;
      } else if ($route.fullPath.includes('/components/responses')) {
        result =  (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          $route.params.contenti +
          '/examples/' +
          $route.params.examplei
        )
        break;
      }
    }
    case 'headers': {
      const docLink = '/documents/' + $route.params.doci
      if ($route.fullPath.includes('components')) {
        result =  docLink + '/components/headers'
      }
    }
    case 'header': {
      const docLink = '/documents/' + $route.params.doci
      if ($route.fullPath.includes('components/headers')) {
        result =  docLink + '/components/headers/' + $route.params.headeri
        break;
      } else if (Object.hasOwn($route.params, 'encodingi')) {
        const path = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const resp =
          path +
          '/operations/' +
          $route.params.opi +
          '/responses/' +
          encodeURIComponent($route.params.responsei)
        const content = resp + '/content/' + encodeURIComponent($route.params.contenti)
        const encoding = content + '/encoding/' + encodeURIComponent($route.params.encodingi)
        result =  encoding + '/headers/' + encodeURIComponent($route.params.headeri)
        break;
      }
    }
    case 'requestBody': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        result =  (
          docLink +
          '/paths/' +
          encodeURIComponent($route.params.pathi) +
          '/operations/' +
          $route.params.opi +
          '/requestBody'
        )
        break;
      }
    }
    case 'encoding': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'encodingi')) {
        const path = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const resp =
          path +
          '/operations/' +
          $route.params.opi +
          '/responses/' +
          encodeURIComponent($route.params.responsei)
        const content = resp + '/content/' + encodeURIComponent($route.params.contenti)
        const encoding = content + '/encoding/' + encodeURIComponent($route.params.encodingi)
        result =  encoding
        break;
      }
    }
    case 'requestBodies': {
      const docLink = '/documents/' + $route.params.doci
      result =  docLink + '/components/requestBodies'
      break;
    }
    case 'securitySchemes':
      {
        const docLink = '/documents/' + $route.params.doci
        result = docLink + '/components/securitySchemes'
        break;
      }
      result =  new Error('Unable to build link for level: ' + level)
      break;
  }
  return result;
}

export default baseLink
