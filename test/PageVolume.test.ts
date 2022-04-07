import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PageVolume from '../src/components/PageVolume.vue'
import type { Unit } from '../src/types'

describe('Component PageVolume', () => {
	it('exists', () => {
		expect(PageVolume).toBeTruthy()
	})

	const wrapper = mount(PageVolume, {
		props: {
			ruler: 'grach',
		},
	})

	it('has the correct values', () => {
		const current = (wrapper.vm.units as Unit[]).slice(3)
		const expected = [ 0.0054, 0.0192, 0.0288, 0.0576, 0.1728,
			0.1728, 0.3456, 1.3824, 8.2944, 24.8832, 248.832 ]

		expect(current.map(unit => unit.value)).toEqual(expected)
	})

	it('rounds numbers correctly', () => {
		const f = wrapper.vm.formatNum as (n: number) => string
		expect(f(0.005)).toBe('5 סמ"ק')
		expect(f(0.05)).toBe('50 סמ"ק')
		expect(f(4)).toBe('4 ליטר')
		expect(f(4000)).toBe('4 מ"ק')
	})

	it('updates values when changing ruler', async () => {
		await wrapper.setProps({
			ruler: 'chazonIsh',
		})

		const current = (wrapper.vm.units as Unit[]).slice(3)
		expect(current[0].value).toBe(0.0093309375)
	})
})
