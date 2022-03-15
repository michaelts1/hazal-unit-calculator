import { describe, expect, it } from 'vitest'
import CalculatorComponent from '../src/components/CalculatorComponent.vue'
import { mount } from '@vue/test-utils'
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
		{ hidden: false, name: 'אצבע', value: 0.005 },
		{ hidden: false, name: 'סנטימטר', value: 0.1 },
		{ hidden: true, name: 'אמה', value: 2 },
		{ hidden: false, name: 'טפח', value: 4 },
		{ hidden: false, name: 'זרת', value: 4000 },
	]
	const wrapper = mount(CalculatorComponent, {
		props: {
			units,
		},
	})

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('responds to events emitted by SelectUnit', () => {
		const [ input, output ] = wrapper.findAllComponents({ name: 'SelectUnit' })

		expect((wrapper.vm.input as Field).unit).toBe('טפח') // Default
		input.vm.$emit('value-change', 'אצבע')
		expect((wrapper.vm.input as Field).unit).toBe('אצבע') // New value

		expect((wrapper.vm.output as Field).unit).toBe('סנטימטר') // Default
		output.vm.$emit('value-change', 'אמה')
		expect((wrapper.vm.output as Field).unit).toBe('אמה') // New value
	})

	it('responds to events emitted by InputAmount', () => {
		const input = wrapper.findComponent({ name: 'InputAmount' })

		expect((wrapper.vm.input as Field).value).toBe(0) // Default
		input.vm.$emit('value-change', 10)
		expect((wrapper.vm.input as Field).value).toBe(10) // New value
	})
})
