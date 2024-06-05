import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import OpenApi from '../openapi.vue'

describe('OpenApi', () => {
  it('renders properly', () => {
    const wrapper = mount(OpenApi, {  })
    expect(wrapper.text()).toContain('Build an API with your thumbs.')
  })
})
