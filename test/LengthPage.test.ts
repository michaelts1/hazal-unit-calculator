import { describe, expect, it } from 'vitest'
import LengthPage from '../src/components/LengthPage.vue'
import { mount } from '@vue/test-utils'
import type { Unit } from '../src/types'

describe('Component LengthPage', () => {
	it('exists', () => {
		expect(LengthPage).toBeTruthy()
	})

	const wrapper = mount(LengthPage)

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('should have the correct values', async () => {
		const current = (wrapper.vm.units as Unit[]).slice(3)
		const expected = [ .02, .08, .16, .24, .48, 128, 960, 3840 ]

		expect(current.map(unit => unit.value)).toEqual(expected)
	})

	it('responds to events emitted by SelectRabi', async () => {
		const SelectRabi = wrapper.findComponent({ name: 'SelectRabi' })

		SelectRabi.vm.$emit('ruler-change', 'חזון_איש')
		expect((wrapper.vm.units as Unit[])[3].value).toBe(.024) // New value
	})
})
