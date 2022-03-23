import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { roundNum } from '../src/helpers'
import type { Unit } from '../src/types'
import UnitTable from '../src/components/UnitTable.vue'

describe('Component UnitTable', () => {
	it('exists', () => {
		expect(UnitTable).toBeTruthy()
	})

	const units: Unit[] = [
		{ hidden: false, name: 'אצבע', value: .005 },
		{ hidden: false, name: 'סנטימטר', value: .1 },
		{ hidden: false, name: 'טפח', value: 4 },
		{ hidden: false, name: 'זרת', value: 4000 },
	]
	const wrapper = mount(UnitTable, {
		props: {
			units,
			format: function formatNum(num: number): string {
				let unit = ' מטר'

				if (num < .01) {
					num *= 1000
					unit = ' מ"מ'
				} else if (num < 1) {
					num *= 100
					unit = ' ס"מ'
				} else if (num > 1000) {
					num /= 1000
					unit = ' ק"מ'
				}

				return roundNum(num) + unit
			},
		},
	})

	it('has a table with the correct number of columns', () => {
		expect(wrapper.find('table').exists()).toBe(true)
		expect(wrapper.findAll('th')).toHaveLength(units.length)
	})

	it('matches snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('lists the correct values and reacts to value changes', async () => {
		expect(wrapper.text()).toContain('5 מ"מ')
		expect(wrapper.text()).toContain('4 מטר')
		expect(wrapper.text()).toContain('4 ק"מ')

		units[0].value = .5
		await wrapper.vm.$forceUpdate() // $forceUpdate is async (the type definition is wrong)
		expect(wrapper.text()).not.toContain('5 מ"מ')
		expect(wrapper.text()).toContain('50 ס"מ')
	})
})
