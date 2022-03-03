import { describe, expect, it } from 'vitest'
import ConversionUIInput from '../src/components/ConversionUIInput.vue'
import { mount } from '@vue/test-utils'

describe('Component ConversionUIInput, enabled', () => {
	it('exists', () => {
		expect(ConversionUIInput).toBeTruthy()
	})

	const wrapper = mount(ConversionUIInput, {
		props: {
			value: 0,
		},
	})

	const input = wrapper.find('input:not([disabled])')

	it('has an active input field with correct classes', () => {
		expect(input.exists()).toBe(true)
		expect(input.classes()).contain('conversion-input')
		expect(input.classes()).not.contain('invalid')
	})

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('reacts only to valid value changes', async () => {
		// Yes, dom value is always a string
		expect(wrapper.vm.domValue).toBe('0')

		await input.setValue(1)
		expect(wrapper.vm.domValue).toBe('1')
		expect(input.classes()).not.contain('invalid')

		await input.setValue('invalid value')
		expect(wrapper.vm.domValue).toBe('invalid value')
		expect(input.classes()).contain('invalid')

		// Both changes should be registered as input events
		const inputEvents = wrapper.emitted('input')
		expect(inputEvents).toHaveLength(2)

		// Only the valid change should be registered as value-change event
		const valueChangeEvents = wrapper.emitted('value-change') as unknown[]
		expect(valueChangeEvents).toHaveLength(1)
		expect(valueChangeEvents[0]).toEqual([ 1 ])
	})

	it('updates domValue when value prop changes', async () => {
		await wrapper.setProps({ value: 5 })
		expect(wrapper.vm.domValue).toBe('5')
	})
})

describe('Component ConversionUIInput, disabled', () => {
	const wrapper = mount(ConversionUIInput, {
		props: {
			value: 0,
			disabled: true,
		},
	})

	const input = wrapper.find('input[disabled]')

	it('has a disabled input field with correct classes', () => {
		expect(input.exists()).toBe(true)
		expect(input.classes()).contain('conversion-input')
		expect(input.classes()).not.contain('invalid')
		expect(input.attributes()).toHaveProperty('disabled')
	})

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it("doesn't reacts value changes", async () => {
		expect(wrapper.vm.domValue).toBe('0')

		await input.setValue(5)
		expect(wrapper.vm.domValue).toBe('0')
	})

	it('Rounds displayed value according the size of the value', async () => {
		await wrapper.setProps({ value: 1.555_555_555_555 })
		expect(wrapper.vm.disabledValue).toBe('1.5556')

		await wrapper.setProps({ value: 0.555_555_555_555 })
		expect(wrapper.vm.disabledValue).toBe('0.55556')

		await wrapper.setProps({ value: 0.005_555_555_555 })
		expect(wrapper.vm.disabledValue).toBe('0.00555556')

		await wrapper.setProps({ value: 0.000_055_555_555 })
		expect(wrapper.vm.disabledValue).toBe('0.0000555556')
	})
})
