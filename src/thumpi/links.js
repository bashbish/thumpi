// links

const baseLink = ($route, level) => {
  switch (level) {
    case 'doc': {
      return '/documents/' + $route.params.doci
    }
    case 'document': {
      return '/documents/' + $route.params.doci
    }
    case 'documents': {
      return '/documents'
    }
    case 'info': {
      return '/documents/' + $route.params.doci + '/info'
    }
    case 'webhooks': {
      return '/documents/' + $route.params.doci + '/webhooks'
    }
    case 'security': {
      return '/documents/' + $route.params.doci + '/security'
    }
    case 'externaldocs': {
      if ($route.params.tagi) {
        const docLink = '/documents/' + $route.params.doci
        return docLink + '/tags/' + $route.params.tagi + '/externaldocs'
      } else {
        return '/documents/' + $route.params.doci + '/externaldocs'
      }
    }
    case 'components': {
      return '/documents/' + $route.params.doci + '/components'
    }
    case 'servers': {
      if ($route.params.opi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/servers'
      } else if ($route.params.pathi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        return pathLink + '/servers'
      } else {
        return '/documents/' + $route.params.doci + '/servers'
      }
    }
    case 'paths': {
      const docLink = '/documents/' + $route.params.doci
      return docLink + '/paths'
    }
    case 'path': {
      const docLink = '/documents/' + $route.params.doci
      return docLink + '/paths/' + encodeURIComponent($route.params.pathi)
    }
    case 'operations': {
      const docLink = '/documents/' + $route.params.doci
      const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
      return pathLink + '/operations'
    }
    case 'operation': {
      const docLink = '/documents/' + $route.params.doci
      const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
      return pathLink + '/operations/' + encodeURIComponent($route.params.opi)
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
        return docLink + '/components/parameters'
      } else if ($route.params.opi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/parameters'
      } else if ($route.params.pathi) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        return pathLink + '/parameters'
      }
    }
    case 'parameter': {
      if (Object.hasOwn($route.params, 'opi')) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/parameters/' + $route.params.parami
      } else if (Object.hasOwn($route.params, 'pathi')) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        return pathLink + '/parameters/' + $route.params.parami
      } else if ($route.fullPath.includes('components')) {
        const docLink = '/documents/' + $route.params.doci
        const compLink = docLink + '/components/parameters'
        return compLink + '/' + encodeURIComponent($route.params.parami)
      }
      throw new Error('could not determine parameter source link')
    }
    case 'tags': {
      const docLink = '/documents/' + $route.params.doci
      return docLink + '/tags'
    }
    case 'tag': {
      const docLink = '/documents/' + $route.params.doci
      return docLink + '/tags/' + $route.params.tagi
    }
    case 'securities': {
      const docLink = '/documents/' + $route.params.doci
      return docLink + '/security'
    }
    case 'schemas': {
      const docLink = '/documents/' + $route.params.doci

      if ($route.fullPath.includes('components')) {
        return docLink + '/components/schemas'
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
        return header + '/schema'
      } else if (
        Object.hasOwn($route.params, 'pathi') &&
        Object.hasOwn($route.params, 'parami') & !Object.hasOwn($route.params, 'opi')
      ) {
        // documents/:doci/paths/:pathi/parameters/:parami/schema
        return (
          docLink +
          '/paths/' +
          encodeURIComponent($route.params.pathi) +
          '/parameters/' +
          encodeURIComponent($route.params.parami) +
          '/schema'
        )
      } else if (
        $route.fullPath.includes('components/parameters') &&
        Object.hasOwn($route.params, 'parami')
      ) {
        return docLink + '/components/parameters/' + $route.params.parami + '/schema'
      } else if (Object.hasOwn($route.params, 'examplei')) {
        return (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          $route.params.contenti +
          '/examples/' +
          $route.params.examplei +
          '/schema'
        )
      } else if ($route.fullPath.includes('components/schemas')) {
        return docLink + '/components/schemas/' + $route.params.schemai
      } else if ($route.fullPath.includes('components/headers')) {
        return docLink + '/components/headers/' + $route.params.headeri + '/schema'
      } else if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'parami')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const paramLink = opLink + '/parameters/' + $route.params.parami
        return paramLink + '/schema'
      }
    }
    case 'properties': {
      const docLink = '/documents/' + $route.params.doci
      if ($route.fullPath.includes('components')) {
        const schemaiLink = docLink + '/components/schemas/' + $route.params.schemai
        return schemaiLink + '/properties'
      }
    }
    case 'server': {
      if (Object.hasOwn($route.params, 'opi')) {
        const docLink = '/documents/' + $route.params.doci
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/servers/' + encodeURIComponent($route.params.servi)
      }
      const docLink = '/documents/' + $route.params.doci
      return docLink + '/servers/' + encodeURIComponent($route.params.servi)
    }
    case 'responses': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/responses'
      }
      if ($route.fullPath.includes('components')) {
        return docLink + '/components/responses'
      }
    }
    case 'response': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/responses/' + encodeURIComponent($route.params.responsei)
      }
      if ($route.fullPath.includes('components')) {
        return docLink + '/components/responses/' + $route.params.responsei
      }
    }
    case 'content': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/responses/' + encodeURIComponent($route.params.responsei)
      }
      if ($route.fullPath.includes('components/responses')) {
        return docLink + '/components/responses/' + $route.params.responsei
      }
    }
    case 'contentitem': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'responsei')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return (
          opLink +
          '/responses/' +
          encodeURIComponent($route.params.responsei) +
          '/content/' +
          encodeURIComponent($route.params.contenti)
        )
      } else if (Object.hasOwn($route.params, 'opi') && $route.fullPath.includes('/requestBody')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        return opLink + '/requestBody/content/' + encodeURIComponent($route.params.contenti)
      } else if ($route.fullPath.includes('components')) {
        return (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          encodeURIComponent($route.params.contenti)
        )
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
        return contentLink + '/examples'
      } else if (Object.hasOwn($route.params, 'opi') && $route.fullPath.includes('/requestBody')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const contentLink = opLink + '/requestBody/content/' + $route.params.contenti
        return contentLink + '/examples'
      } else if ($route.fullPath.includes('/components/responses/')) {
        return (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          $route.params.contenti +
          '/examples'
        )
      } else if ($route.fullPath.includes('/components')) {
        return docLink + '/components/examples'
      }
    }
    case 'example': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi') && $route.fullPath.includes('/requestBody')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const contentLink = opLink + '/requestBody/content/' + $route.params.contenti
        return contentLink + '/examples' + $route.params.examplei
      } else if (Object.hasOwn($route.params, 'opi') && Object.hasOwn($route.params, 'responsei')) {
        const pathLink = docLink + '/paths/' + encodeURIComponent($route.params.pathi)
        const opLink = pathLink + '/operations/' + encodeURIComponent($route.params.opi)
        const contentLink =
          opLink +
          '/responses/' +
          encodeURIComponent($route.params.responsei) +
          '/content/' +
          $route.params.contenti
        return contentLink + '/examples/' + $route.params.examplei
      } else if ($route.fullPath.includes('/components/responses')) {
        return (
          docLink +
          '/components/responses/' +
          $route.params.responsei +
          '/content/' +
          $route.params.contenti +
          '/examples/' +
          $route.params.examplei
        )
      }
    }
    case 'headers': {
      const docLink = '/documents/' + $route.params.doci
      if ($route.fullPath.includes('components')) {
        return docLink + '/components/headers'
      }
    }
    case 'header': {
      const docLink = '/documents/' + $route.params.doci
      if ($route.fullPath.includes('components/headers')) {
        return docLink + '/components/headers/' + $route.params.headeri
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
        return encoding + '/headers/' + encodeURIComponent($route.params.headeri)
      }
    }
    case 'requestBody': {
      const docLink = '/documents/' + $route.params.doci
      if (Object.hasOwn($route.params, 'opi')) {
        return (
          docLink +
          '/paths/' +
          encodeURIComponent($route.params.pathi) +
          '/operations/' +
          $route.params.opi +
          '/requestBody'
        )
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
        return encoding
      }
    }
    case 'requestBodies': {
      const docLink = '/documents/' + $route.params.doci
      return docLink + '/components/requestBodies'
    }
    case 'securitySchemes':
      {
        const docLink = '/documents/' + $route.params.doci
        return docLink + '/components/securitySchemes'
      }
      throw new Error('Unable to build link for level: ' + level)
  }
}

export default baseLink
