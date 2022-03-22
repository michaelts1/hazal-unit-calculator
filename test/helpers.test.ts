import { describe, expect, it } from 'vitest'
import { roundNum } from '../src/helpers'

describe('roundNum', () => {
	it('should round numbers to 10 fractional digits', () => {
		expect(roundNum(5.555_555_555_555)).toBe(5.555_555_555_6)
	})

	it('should not modify numbers with less than 10 fractional digits', () => {
		expect(roundNum(5.555_555_555)).toBe(5.555_555_555)
	})
})
