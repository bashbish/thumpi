import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import Documents from '../documents.vue'

import thumpi from '../../thumpi/thumpi.js'
import {createRouter, createWebHistory} from "vue-router";

import jsYaml from "js-yaml";

describe('Documents',  () => {
  it('create document by version', async () => {


    thumpi.getDocs().push(jsYaml.load('../../public/samples/petstore.yaml'))

    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/documents', component: { template: '<div id="testId"/>' } },
        { path: '/documents/:doci', component: { template: '<div id="testId"/>' } },
        { path: '/', component: { template: '<div id="testId"/>' } }]
    });

    const wrapper = mount(Documents, {
      global: {
        provide: {
          $thumpi: thumpi,
          router: router,
        },
        config: {
          globalProperties: {
            $thumpi: thumpi
          }
        },
        plugins: [router],
      }
    });

    await router.isReady();

    const pushSpy = vi.spyOn(router, 'push');

    const versionSelector = wrapper.get('select');
    await versionSelector.setValue("3.0.3");

    expect(wrapper.vm.version).toBe('3.0.3');

    await wrapper.get('#addByVersion').trigger('click')

    expect(pushSpy).toHaveBeenCalledWith('/documents/1');

    expect(thumpi.getDocs() ).length(2)

    const doc = thumpi.getDocs()[1];
    console.log(JSON.stringify(doc.info))
    expect( doc.info.version).eq("0.0.1", )



  })

})
