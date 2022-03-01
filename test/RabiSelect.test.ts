import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RabiSelect from '../src/components/RabiSelect.vue'

describe('Component RabiSelect', () => {
	it('exists', () => {
		expect(RabiSelect).toBeTruthy()
	})

	const wrapper = mount(RabiSelect, {
		props: {
			defaultRuler: 'גר"ח',
		},
	})

	it('has a select field with correct id and 2 options', () => {
		expect(wrapper.find('select').exists()).toBe(true)
		expect(wrapper.find('select').attributes()).toHaveProperty('id', 'ruler-select')
		expect(wrapper.findAll('option')).toHaveLength(2)
	})

	it('matches snapshot', () => {
		expect(wrapper.text()).toMatchSnapshot()
	})

	it('reacts to value changes', async () => {
		const options = wrapper.findAll('option')

		await options[1].setSelected()
		expect(wrapper.vm.value).toBe('חזון_איש')

		await options[0].setSelected()
		expect(wrapper.vm.value).toBe('גרח')

		const rulerChangeEvent = wrapper.emitted('ruler-change') as unknown[]
		expect(rulerChangeEvent[0]).toEqual([ 'חזון_איש' ])
		expect(rulerChangeEvent[1]).toEqual([ 'גרח' ])

		const changeEvent = wrapper.emitted('change') as unknown[]
		expect(changeEvent).toHaveLength(2)
	})
})
