import { describe, expect, it } from 'vitest'
import LengthPage from '../src/components/LengthPage.vue'
import { mount } from '@vue/test-utils'

describe('Component LengthPage', () => {
	it('exists', () => {
		expect(LengthPage).toBeTruthy()
	})

	const wrapper = mount(LengthPage)

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('responds to events emitted by SelectRabi', async () => {
		const SelectRabi = wrapper.findComponent({ name: 'SelectRabi' })

		expect(wrapper.vm.etzba).toBe(0.02) // Default
		SelectRabi.vm.$emit('ruler-change', 'חזון_איש')
		expect(wrapper.vm.etzba).toBe(0.024) // New value
	})
})
