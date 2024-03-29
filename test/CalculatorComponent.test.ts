import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorComponent from '../src/components/CalculatorComponent.vue'
import type { Unit } from '../src/types'

interface Field {
	unit: string
	value: number
}

describe('Component CalculatorComponent', () => {
	it('exists', () => {
		expect(CalculatorComponent).toBeTruthy()
	})

	const units: Unit[] = [
		{ id: 'etzba', hidden: false, name: 'אצבע', value: .005 },
		{ id: 'cm', hidden: false, name: 'סנטימטר', value: .1 },
		{ id: 'amah', hidden: true, name: 'אמה', value: 2 },
		{ id: 'tefach', hidden: false, name: 'טפח', value: 4 },
		{ id: 'zeret', hidden: false, name: 'זרת', value: 4000 },
	]
	const wrapper = mount(CalculatorComponent, {
		props: {
			units,
			defaultUnits: {
				input: 'tefach',
				output: 'cm',
			},
		},
	})

	it('responds to events emitted by SelectUnit', () => {
		const [ input, output ] = wrapper.findAllComponents({ name: 'SelectUnit' })

		expect((wrapper.vm.input as Field).unit).toBe('tefach') // Default
		input.vm.$emit('value-change', 'etzba')
		expect((wrapper.vm.input as Field).unit).toBe('etzba') // New value

		expect((wrapper.vm.output as Field).unit).toBe('cm') // Default
		output.vm.$emit('value-change', 'amah')
		expect((wrapper.vm.output as Field).unit).toBe('amah') // New value
	})

	it('responds to events emitted by InputAmount', () => {
		const input = wrapper.findComponent({ name: 'InputAmount' })

		expect((wrapper.vm.input as Field).value).toBe(0) // Default
		input.vm.$emit('value-change', 10)
		expect((wrapper.vm.input as Field).value).toBe(10) // New value
	})

	it('updates when the units prop changes', async () => {
		const oldValue = (wrapper.vm.output as Field).value

		const newUnits = JSON.parse(JSON.stringify(units))
		newUnits[0].value *= 2 // Change base unit value
		await wrapper.setProps({ units: newUnits })

		expect((wrapper.vm.output as Field).value).toBe(oldValue * 2)
	})

	it('swaps input and output correctly', async () => {
		const input = wrapper.vm.input as Field
		const output = wrapper.vm.output as Field

		wrapper.find('button.btn-light').trigger('click')

		expect(output).toBe(wrapper.vm.input)
		expect(input).toBe(wrapper.vm.output)
	})
})
