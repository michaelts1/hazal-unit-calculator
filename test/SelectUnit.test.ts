import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectUnit from '../src/components/SelectUnit.vue'

describe('Component SelectUnit', () => {
	it('exists', () => {
		expect(SelectUnit).toBeTruthy()
	})

	const units = [
		{ id: 'a', hidden: false, name: 'א', value: .005 },
		{ id: 'b', hidden: false, name: 'ב', value: .1 },
	]
	const wrapper = mount(SelectUnit, {
		props: {
			selectedUnit: units[0].id,
			units,
		},
	})

	it('has a select field with the correct number of options', () => {
		expect(wrapper.find('select').exists()).toBe(true)
		expect(wrapper.findAll('option')).toHaveLength(units.length)
	})

	it('reacts to value changes', async () => {
		expect(wrapper.vm.selectedUnit).toBe(units[0].id)

		await wrapper.find('select').setValue(units[1].id)
		const changeEvents = wrapper.emitted('change')
		const valueChangeEvents = wrapper.emitted('value-change') as unknown[]

		expect(changeEvents).toHaveLength(1)
		expect(valueChangeEvents).toHaveLength(1)
		expect(valueChangeEvents[0]).toEqual([ units[1].id ])
	})
})
