import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectRabi from '../src/components/SelectRabi.vue'
import type { Ruler } from '../src/types'

describe('Component SelectRabi', () => {
	it('exists', () => {
		expect(SelectRabi).toBeTruthy()
	})

	const wrapper = mount(SelectRabi, {
		props: {
			defaultRuler: 'grach' as Ruler,
		},
	})

	it('has a select field with correct id and 2 option elements', () => {
		expect(wrapper.find('select').exists()).toBe(true)
		expect(wrapper.find('select').attributes()).toHaveProperty('id', 'ruler-select')
		expect(wrapper.findAll('option')).toHaveLength(2)
	})

	it('reacts to value changes', async () => {
		const select = wrapper.find('select')

		await select.setValue('chazonIsh')
		expect(wrapper.vm.value).toBe('chazonIsh')

		await select.setValue('grach')
		expect(wrapper.vm.value).toBe('grach')

		const rulerChangeEvents = wrapper.emitted('ruler-change') as unknown[]
		expect(rulerChangeEvents[0]).toEqual([ 'chazonIsh' ])
		expect(rulerChangeEvents[1]).toEqual([ 'grach' ])

		const changeEvents = wrapper.emitted('change') as unknown[]
		expect(changeEvents).toHaveLength(2)
	})
})
