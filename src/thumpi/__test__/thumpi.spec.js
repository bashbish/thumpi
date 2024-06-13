import { describe, it, expect } from 'vitest'
import  thumpi  from '../thumpi.js'

describe('thumpi.addDoc', () => {
    it('returns count', () => {
        const version= '3.0.3'
        // const thumpi = createThumpi();
        const result0 = thumpi.addNewDocByVersion(version)
        expect(result0).toEqual(0)
        const result1 = thumpi.addNewDocByVersion(version)
        expect(result1).toEqual(1)
    })
})



