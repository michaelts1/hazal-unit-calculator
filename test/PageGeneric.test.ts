import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PageGeneric from '../src/components/PageGeneric.vue'

describe('Component PageGeneric', () => {
	it('exists', () => {
		expect(PageGeneric).toBeTruthy()
	})

	const props = {
		defaultUnits: {
			input: 'א',
			output: 'ב',
		},
		formatNum: (n: number) => ''+n,
		message: 'הודעה',
		units: [
			{ hidden: false, name: 'א', value: .005 },
			{ hidden: false, name: 'ב', value: .1 },
		],
	}

	const wrapper = mount(PageGeneric, {
		props,
	})

	it('has the correct children', () => {
		const h6 = wrapper.find('h6')
		const TableGeneric = wrapper.findComponent({ name: 'TableGeneric' })
		const CalculatorComponent = wrapper.findComponent({ name: 'CalculatorComponent' })

		expect(h6.text()).toBe(props.message)
		expect(TableGeneric.exists()).toBe(true)
		expect(CalculatorComponent.exists()).toBe(true)
	})
})
