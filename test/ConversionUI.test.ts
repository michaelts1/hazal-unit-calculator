import { describe, expect, it } from 'vitest'
import ConversionUI from '../src/components/ConversionUI.vue'
import { mount } from '@vue/test-utils'

describe('Component ConversionUI', () => {
	it('exists', () => {
		expect(ConversionUI).toBeTruthy()
	})

	const wrapper = mount(ConversionUI)

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('responds to events emitted by RabiSelect', async () => {
		const RabiSelect = wrapper.findComponent({ name: 'RabiSelect' })

		expect(wrapper.vm.etzba).toBe(0.02) // Default
		RabiSelect.vm.$emit('ruler-change', 'חזון_איש')
		expect(wrapper.vm.etzba).toBe(0.024) // New value
	})
})
