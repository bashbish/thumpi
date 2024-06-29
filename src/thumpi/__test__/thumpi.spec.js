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
        expect(2).equals(thumpi.getDocs().length)
    })


    it('default 3.0.3 doc', () => {
        const version= '3.0.3'
        const idx = thumpi.addNewDocByVersion(version)
        const doc = thumpi.getDocs()[idx];
        expect(doc).to.be.an("object", "doc not found")
        expect(doc.info.version).toEqual('0.0.1');
        expect(doc.info.title).toEqual("Edit me...");
        expect(doc.openapi).toEqual(version);

    })
})



