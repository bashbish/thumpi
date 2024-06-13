import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import Navbar from '../navbar.vue'

import thumpi from '../../thumpi/thumpi.js'
import {createRouter, createWebHistory} from "vue-router";
describe('Navbar',  () => {
  it('renders properly', async () => {


    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/documents', component: { template: '<div id="testId"/>' } },
        { path: '/', component: { template: '<div id="testId"/>' } }]
    });

    const wrapper = mount(Navbar, {
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

    expect(wrapper.text()).toContain('About')
  })

  it('nav to /documents', async () => {

    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/documents', component: { template: '<div id="testId"/>' } },
        { path: '/about', component: { template: '<div id="testId"/>' } },
        { path: '/', component: { template: '<div id="testId"/>' } }]
    });

    const wrapper = mount(Navbar, {
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

    const a = wrapper.get('#navBarDocuments');
    expect(a.text()).toEqual('Documents');
    await a.trigger('click');

    expect(pushSpy).toHaveBeenCalledWith('/documents');

    const about = wrapper.get('#navBarAbout');
    expect(about.text()).toEqual('About');
    await about.trigger('click');

    expect(pushSpy).toHaveBeenCalledWith('/about');



    const thump = wrapper.get('#navToThumpi');
    expect(thump.text()).toEqual('Thumpi');
    await thump.trigger('click');

    expect(pushSpy).toHaveBeenCalledWith('/');



  })

})
