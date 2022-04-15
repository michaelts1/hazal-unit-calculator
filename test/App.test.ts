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
		SelectRabi.vm.$emit('ruler-change', 'chazonIsh')
		expect(wrapper.vm.ruler).toBe('chazonIsh')
	})

	it("doesn't show any page if page name is invalid", async () => {
		await wrapper.setData({ page: 'nonsense' })

		const PageLength = wrapper.findComponent({ name: 'PageLength' })
		const PageVolume = wrapper.findComponent({ name: 'PageVolume' })

		expect(PageLength.exists()).toBe(false)
		expect(PageVolume.exists()).toBe(false)
	})

	it('can change locale', async () => {
		expect(wrapper.vm.otherLang).toBe('en')

		await wrapper.find('#switch-lang').trigger('click')
		expect(wrapper.vm.otherLang).toBe('he')
	})

	it('hides SelectRabi when page === weight', async () => {
		await wrapper.setData({ page: 'weight' })

		const PageLength = wrapper.findComponent({ name: 'PageLength' })
		const SelectRabi = wrapper.findComponent({ name: 'SelectRabi' })
		const PageWeight = wrapper.findComponent({ name: 'PageWeight' })

		expect(PageLength.exists()).toBe(false)
		expect(PageWeight.exists()).toBe(true)
		expect(SelectRabi.exists()).toBe(false)
	})
})
