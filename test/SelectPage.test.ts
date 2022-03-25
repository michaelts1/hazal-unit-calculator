import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectPage from '../src/components/SelectPage.vue'

describe('Component SelectPage', () => {
	it('exists', () => {
		expect(SelectPage).toBeTruthy()
	})

	const wrapper = mount(SelectPage)

	it('has a select field with the correct number of options', () => {
		expect(wrapper.find('select').exists()).toBe(true)
		expect(wrapper.findAll('option')).toHaveLength(2)
	})

	it('reacts to value changes', async () => {
		await wrapper.find('select').setValue('volume')
		const pageChangeEvents = wrapper.emitted('page-change')

		expect(pageChangeEvents).toEqual([[ 'volume' ]])
	})
})
