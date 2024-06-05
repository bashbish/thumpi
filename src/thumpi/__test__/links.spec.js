import { describe, it, expect } from 'vitest'
import  baseLink  from '../links.js'

describe('baseLink', () => {
    it('renders /document/:doci', () => {
        const route = {params: {doci:0}}
        const level = 'document'
        expect(baseLink(route, level)).toContain('/documents/0')
    })

    it('renders /document/:doci', () => {
        const route = {params: {doci:0}}
        const level = 'doc'
        expect(baseLink(route, level)).toContain('/documents/0')
    })

    it('renders /document/:doci/info', () => {
        const route = {params: {doci:0}}
        const level = 'info'
        expect(baseLink(route, level)).toContain('/documents/0/info')
    })

    it('renders /document/:doci/components', () => {
        const route = {params: {doci:0}}
        const level = 'components'
        expect(baseLink(route, level)).toContain('/documents/0/components')
    })

    it('renders /document/:doci/paths', () => {
        const route = {params: {doci:0}}
        const level = 'paths'
        expect(baseLink(route, level)).toContain('/documents/0/paths')
    })
})
