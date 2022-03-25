import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Ruler } from '../src/types'
import SelectRabi from '../src/components/SelectRabi.vue'

describe('Component SelectRabi', () => {
	it('exists', () => {
		expect(SelectRabi).toBeTruthy()
	})

	const wrapper = mount(SelectRabi, {
		props: {
			defaultRuler: 'גר"ח' as Ruler,
		},
	})

	it('has a select field with correct id and 2 option elements', () => {
		expect(wrapper.find('select').exists()).toBe(true)
		expect(wrapper.find('select').attributes()).toHaveProperty('id', 'ruler-select')
		expect(wrapper.findAll('option')).toHaveLength(2)
	})

	it('reacts to value changes', async () => {
		const select = wrapper.find('select')

		await select.setValue('חזון_איש')
		expect(wrapper.vm.value).toBe('חזון_איש')

		await select.setValue('גרח')
		expect(wrapper.vm.value).toBe('גרח')

		const rulerChangeEvents = wrapper.emitted('ruler-change') as unknown[]
		expect(rulerChangeEvents[0]).toEqual([ 'חזון_איש' ])
		expect(rulerChangeEvents[1]).toEqual([ 'גרח' ])

		const changeEvents = wrapper.emitted('change') as unknown[]
		expect(changeEvents).toHaveLength(2)
	})
})
