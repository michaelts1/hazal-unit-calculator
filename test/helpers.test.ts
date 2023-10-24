import { debounce, roundNum } from '../src/helpers'
import { describe, expect, it, vi } from 'vitest'

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
		vi.useFakeTimers()

		let hasFnTriggered = false
		const debouncedFn = debounce(() => hasFnTriggered = true, 5)

		debouncedFn()
		vi.advanceTimersByTime(2)
		expect(hasFnTriggered).toBe(false)

		debouncedFn()
		vi.advanceTimersByTime(4)
		expect(hasFnTriggered).toBe(false)

		vi.advanceTimersByTime(1) // Totaling up to 5 ms since last triggered
		expect(hasFnTriggered).toBe(true)

		vi.useRealTimers()
	})
})
