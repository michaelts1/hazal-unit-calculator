import { describe, expect, it } from 'vitest'
import ConversionUISelect from '../src/components/ConversionUISelect.vue'
import { mount } from '@vue/test-utils'

describe('Component ConversionUISelect', () => {
	it('exists', () => {
		expect(ConversionUISelect).toBeTruthy()
	})

	const unitNames = [ 'טפח', 'אצבע' ]
	const wrapper = mount(ConversionUISelect, {
		props: {
			selectedUnit: unitNames[0],
			unitNames,
		},
	})

	it('has a select field with the correct number of options', () => {
		expect(wrapper.find('select').exists()).toBe(true)
		expect(wrapper.findAll('option')).toHaveLength(unitNames.length)
	})

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('reacts to value changes', async () => {
		expect(wrapper.vm.selectedUnit).toBe(unitNames[0])

		await wrapper.find('select').setValue(unitNames[1])
		const changeEvents = wrapper.emitted('change')
		const valueChangeEvents = wrapper.emitted('value-change') as unknown[]

		expect(changeEvents).toHaveLength(1)
		expect(valueChangeEvents).toHaveLength(1)
		expect(valueChangeEvents[0]).toEqual([ unitNames[1] ])
	})
})
