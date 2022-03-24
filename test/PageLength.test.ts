import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PageLength from '../src/components/PageLength.vue'
import type { Unit } from '../src/types'

describe('Component PageLength', () => {
	it('exists', () => {
		expect(PageLength).toBeTruthy()
	})

	const wrapper = mount(PageLength)

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

	it('rounds numbers correctly', () => {
		const f = wrapper.vm.formatNum as (n: number) => string
		expect(f(0.005)).toContain('5 מ"מ')
		expect(f(0.05)).toContain('5 ס"מ')
		expect(f(4)).toContain('4 מטר')
		expect(f(4000)).toContain('4 ק"מ')
	})
})
