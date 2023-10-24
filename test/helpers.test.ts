import { debounce, roundNum } from '../src/helpers'
import { describe, expect, it } from 'vitest'
import { sleep } from './test-utils'

describe('roundNum', () => {
	it('rounds numbers to 10 fractional digits', () => {
		expect(roundNum(5.555_555_555_555)).toBe(5.555_555_555_6)
	})

	it('does not modify numbers with less than 10 fractional digits', () => {
		expect(roundNum(5.555_555_555)).toBe(5.555_555_555)
	})
})

describe('debounce', () => {
	it ('should only trigger after enough time has passed', async () => {
		let hasFnTriggered = false
		const debouncedFn = debounce(() => hasFnTriggered = true, 5)

		debouncedFn()
		await sleep(2)
		expect(hasFnTriggered).toBe(false)

		debouncedFn()
		await sleep(4)
		expect(hasFnTriggered).toBe(false)

		await sleep(1) // Totaling up to 5 ms since last triggered
		expect(hasFnTriggered).toBe(true)
	})
})
