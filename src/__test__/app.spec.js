import { shallowMount, mount } from '@vue/test-utils';
import {RouterView} from 'vue-router'
import App from '../App.vue'; // Adjust the import path according to your file structure
import Navbar from '@/components/Navbar.vue';
import { createRouter, createWebHistory } from 'vue-router';
import thumpi from "@/thumpi/thumpi.js";

describe('App.vue', () => {
    it('renders Navbar and RouterView components', async () => {
        // Create a mock router
        const router = createRouter({
            history: createWebHistory(),
            routes: [{ path: '/', component: { template: '<div id="testId"/>' } }]
        });

        // Mount the component
        const wrapper = mount(App, {
            global: {
                plugins: [router],
                components: {
                    Navbar
                },
                stubs: {
                    RouterView: true // Stub the RouterView
                },
                provide: {
                    $thumpi: thumpi,
                },
            }
        });

        // Wait for router to be ready
        await router.isReady();

        // Check if Navbar is rendered
        expect(wrapper.findComponent(Navbar).exists()).toBe(true);

        // Check if RouterView is rendered
        expect(wrapper.findComponent(RouterView).exists()).toBe(true);

        // Optional: Check for the correct rendering structure
        expect(wrapper.find('.container > .row > .col').exists()).toBe(true);
    });
});