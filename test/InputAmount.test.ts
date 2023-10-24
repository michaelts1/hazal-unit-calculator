import { beforeEach, describe, expect, it, vi } from 'vitest'
import InputAmount from '../src/components/InputAmount.vue'
import { mount } from '@vue/test-utils'
import { setInvalidValue } from './test-utils'

describe('Component InputAmount, enabled', () => {
	it('exists', () => {
		expect(InputAmount).toBeTruthy()
	})

	let wrapper = mount(InputAmount, { props: { value: 0 } })
	let input = wrapper.find('input:not([disabled])')
	beforeEach(() => { // Reset component
		vi.useFakeTimers()
		wrapper = mount(InputAmount, { props: { value: 0 } })
		input = wrapper.find('input:not([disabled])')

		return vi.useRealTimers // AfterEach function
	})

	it('has an active input field with correct classes', () => {
		expect(input.exists()).toBe(true)
		expect(input.classes()).contain('input-amount')
		expect(input.classes()).not.contain('invalid')
	})

	it('reacts to valid value changes', async () => {
		// Yes, dom value is always a string
		expect(wrapper.vm.domValue).toBe('0')

		await input.setValue(1)
		vi.runOnlyPendingTimers()
		expect(wrapper.vm.domValue).toBe('1')
		expect(input.classes()).not.contain('invalid')

		// Should be registered as input events
		const inputEvents = wrapper.emitted('input')
		expect(inputEvents).toHaveLength(1)

		// Should be registered as value-change event
		const valueChangeEvents = wrapper.emitted('value-change')
		expect(valueChangeEvents).toEqual([ [1] ])
	})

	it('doesn\'t react to invalid value changes', async () => {
		await setInvalidValue(input, 'invalid value')
		vi.runOnlyPendingTimers()
		expect(wrapper.vm.domValue).toBe('invalid value')
		expect(input.classes()).contain('invalid')

		// Should be registered as input events
		const inputEvents = wrapper.emitted('input')
		expect(inputEvents).toHaveLength(2) // Two event were emitted due to `setInvalidValue`

		// Shouldn't be registered as value-change event
		const valueChangeEvents = wrapper.emitted('value-change')
		expect(valueChangeEvents).toBe(undefined)
	})

	it('updates domValue when value prop changes', async () => {
		await wrapper.setProps({ value: 5 })
		expect(wrapper.vm.domValue).toBe('5')
	})

	it('should wait for the user to complete a simple fraction', async () => {
		await setInvalidValue(input, '5/')
		vi.runOnlyPendingTimers()
		expect(wrapper.vm.domValue).toBe('5/')
		expect(input.classes()).not.contain('invalid')

		await input.setValue('5/2')
		vi.runOnlyPendingTimers()
		const valueChangeEvents = wrapper.emitted('value-change')
		expect(valueChangeEvents).toEqual([ [2.5] ])
	})
})

describe('Component InputAmount, disabled', () => {
	const wrapper = mount(InputAmount, {
		props: {
			value: 0,
			disabled: true,
		},
	})

	const input = wrapper.find('input[disabled]')

	it('has a disabled input field with correct classes', () => {
		expect(input.exists()).toBe(true)
		expect(input.classes()).contain('input-amount')
		expect(input.classes()).not.contain('invalid')
		expect(input.attributes()).toHaveProperty('disabled')
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
