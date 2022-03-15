import { describe, expect, it } from 'vitest'
import LengthTable from '../src/components/LengthTable.vue'
import { mount } from '@vue/test-utils'
import type { Unit } from '../src/types'

interface ColumnData {
	unit: string
	value: number
}

describe('Component LengthTable', () => {
	it('exists', () => {
		expect(LengthTable).toBeTruthy()
	})

	const units: Unit[] = [
		{ hidden: false, name: 'אצבע', value: 0.005 },
		{ hidden: false, name: 'סנטימטר', value: 0.1 },
		{ hidden: true, name: 'אמה', value: 2 },
		{ hidden: false, name: 'טפח', value: 4 },
		{ hidden: false, name: 'זרת', value: 4000 },
	]
	const wrapper = mount(LengthTable, {
		props: {
			units,
		},
	})

	it('has a table with the correct number of columns', () => {
		expect(wrapper.find('table').exists()).toBe(true)
		expect(wrapper.findAll('th')).toHaveLength(units.filter(u => !u.hidden).length)
	})

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('lists the correct values and reacts to value changes', async () => {
		expect(wrapper.text()).toContain('5 מ"מ')
		expect(wrapper.text()).not.toContain('2 מטר')
		expect(wrapper.text()).toContain('4 ק"מ')

		units[0].value = 0.5
		await wrapper.vm.$forceUpdate() // $forceUpdate is async (the type definition is wrong)
		expect(wrapper.text()).not.toContain('5 מ"מ')
		expect(wrapper.text()).toContain('50 ס"מ')
	})

	it('responds to events emitted by SelectUnit', () => {
		const [ input, output ] = wrapper.findAllComponents({ name: 'SelectUnit' })

		expect((wrapper.vm.input as ColumnData).unit).toBe('טפח') // Default
		input.vm.$emit('value-change', 'אצבע')
		expect((wrapper.vm.input as ColumnData).unit).toBe('אצבע') // New value

		expect((wrapper.vm.output as ColumnData).unit).toBe('סנטימטר') // Default
		output.vm.$emit('value-change', 'אמה')
		expect((wrapper.vm.output as ColumnData).unit).toBe('אמה') // New value
	})

	it('responds to events emitted by InputAmount', () => {
		const input = wrapper.findComponent({ name: 'InputAmount' })

		expect((wrapper.vm.input as ColumnData).value).toBe(0) // Default
		input.vm.$emit('value-change', 10)
		expect((wrapper.vm.input as ColumnData).value).toBe(10) // New value
	})
})
