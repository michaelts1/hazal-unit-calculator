import { describe, expect, it } from 'vitest'
import App from '../src/App.vue'
import {  mount } from '@vue/test-utils'

describe('App', () => {
	it('exists', () => {
		expect(App).toBeTruthy()
	})

	const wrapper = mount(App)

	it('only shows length page by default', () => {
		const PageLength = wrapper.findComponent({ name: 'PageLength' })
		const PageVolume = wrapper.findComponent({ name: 'PageVolume' })

		expect(PageLength.exists()).toBe(true)
		expect(PageVolume.exists()).toBe(false)
	})

	it('responds to page change', async () => {
		const SelectPage = wrapper.getComponent({ name: 'SelectPage' })
		SelectPage.vm.$emit('page-change', 'volume')
		expect(wrapper.vm.page).toBe('volume')
	})

	it('only shows volume page after page change', async () => {
		await wrapper.setData({ page: 'volume' })

		const PageLength = wrapper.findComponent({ name: 'PageLength' })
		const PageVolume = wrapper.findComponent({ name: 'PageVolume' })

		expect(PageLength.exists()).toBe(false)
		expect(PageVolume.exists()).toBe(true)
	})

	it('responds to ruler change', async () => {
		const SelectRabi = wrapper.getComponent({ name: 'SelectRabi' })
		SelectRabi.vm.$emit('ruler-change', 'חזון_איש')
		expect(wrapper.vm.ruler).toBe('חזון_איש')
	})

	it("doesn't show any page if page name is invalid", async () => {
		await wrapper.setData({ page: 'gra' })

		const PageLength = wrapper.findComponent({ name: 'PageLength' })
		const PageVolume = wrapper.findComponent({ name: 'PageVolume' })

		expect(PageLength.exists()).toBe(false)
		expect(PageVolume.exists()).toBe(false)
	})
})
