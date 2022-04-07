import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PageLength from '../src/components/PageLength.vue'
import type { Unit } from '../src/types'

describe('Component PageLength', () => {
	it('exists', () => {
		expect(PageLength).toBeTruthy()
	})

	const wrapper = mount(PageLength, {
		props: {
			ruler: 'grach',
		},
	})

	it('has the correct values', () => {
		const current = (wrapper.vm.units as Unit[]).slice(3)
		const expected = [ .02, .08, .16, .24, .48, 128, 960, 3840 ]

		expect(current.map(unit => unit.value)).toEqual(expected)
	})

	it('rounds numbers correctly', () => {
		const f = wrapper.vm.formatNum as (n: number) => string
		expect(f(0.005)).toBe('5 מ"מ')
		expect(f(0.05)).toBe('5 ס"מ')
		expect(f(4)).toBe('4 מטר')
		expect(f(4000)).toBe('4 ק"מ')
	})

	it('updates values when changing ruler', async () => {
		await wrapper.setProps({
			ruler: 'chazonIsh',
		})

		const current = (wrapper.vm.units as Unit[]).slice(3)
		expect(current[0].value).toBe(0.024)
	})
})
