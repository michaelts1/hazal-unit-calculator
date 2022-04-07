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
			{ id: 'a', hidden: false, name: 'א', value: .005 },
			{ id: 'b', hidden: false, name: 'ב', value: .1 },
		],
	}

	const wrapper = mount(PageGeneric, {
		props,
	})

	it('has the correct children: innerWidth = 1024', () => {
		const h6 = wrapper.find('h6')
		const TableGeneric = wrapper.findComponent({ name: 'TableGeneric' })
		const TableGenericLowWidth = wrapper.findComponent({ name: 'TableGenericLowWidth' })
		const CalculatorComponent = wrapper.findComponent({ name: 'CalculatorComponent' })

		expect(h6.text()).toBe(props.message)
		expect(TableGeneric.exists()).not.toBe(true)
		expect(TableGenericLowWidth.exists()).toBe(true)
		expect(CalculatorComponent.exists()).toBe(true)
	})

	it('has the correct children: innerWidth = 1920', async () => {
		window.innerWidth = 1920
		await (wrapper.vm as unknown as { updateWidth(): Promise<void> }).updateWidth()

		const TableGeneric = wrapper.findComponent({ name: 'TableGeneric' })
		const TableGenericLowWidth = wrapper.findComponent({ name: 'TableGenericLowWidth' })

		expect(TableGeneric.exists()).toBe(true)
		expect(TableGenericLowWidth.exists()).not.toBe(true)
	})
})
