import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { roundNum } from '../src/helpers'
import TableGeneric from '../src/components/TableGeneric.vue'
import type { Unit } from '../src/types'

const units: Unit[] = [
	{ id: 'etzba', hidden: false, name: 'אצבע', value: .005 },
	{ id: 'centimeter', hidden: false, name: 'סנטימטר', value: .1 },
	{ id: 'tefach', hidden: false, name: 'טפח', value: 4 },
	{ id: 'zeret', hidden: false, name: 'זרת', value: 4000 },
]
const wrapper = mount(TableGeneric, {
	props: {
		units,
		formatNum(num: number): string {
			let unit = 'מטר'

			if (num < .01) {
				num *= 1000
				unit = 'מ"מ'
			} else if (num < 1) {
				num *= 100
				unit = 'ס"מ'
			} else if (num > 1000) {
				num /= 1000
				unit = 'ק"מ'
			}

			return roundNum(num) + ' ' + unit
		},
	},
})

describe('Component TableGeneric', () => {
	it('exists', () => {
		expect(TableGeneric).toBeTruthy()
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

describe('Component TableGeneric: innerWidth = 1024', () => {
	it('has the correct children', () => {
		expect(wrapper.find('table').exists()).toBe(false)
		expect(wrapper.find('th').exists()).toBe(false)
		expect(wrapper.find('td').exists()).toBe(false)

		expect(wrapper.find('#table-low-width').exists()).toBe(true)
		expect(wrapper.findAll('.row')).toHaveLength(units.length)
		expect(wrapper.find('.col').exists()).toBe(true)
	})
})

describe('Component TableGeneric: innerWidth = 1920', () => {
	it('has the correct children', async () => {
		window.innerWidth = 1920
		await (wrapper.vm as unknown as { updateWidth(): Promise<void> }).updateWidth()

		expect(wrapper.find('#table-low-width').exists()).toBe(false)
		expect(wrapper.find('.row').exists()).toBe(false)
		expect(wrapper.find('.col').exists()).toBe(false)

		expect(wrapper.find('table').exists()).toBe(true)
		expect(wrapper.findAll('th')).toHaveLength(units.length)
		expect(wrapper.find('td').exists()).toBe(true)
	})
})
