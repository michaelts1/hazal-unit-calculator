import { describe, expect, it } from 'vitest'
import { roundNum, UnitValues } from '../src/helpers'

describe('roundNum', () => {
	it('should round numbers to 10 fractional digits', () => {
		expect(roundNum(5.555_555_555_555)).toBe(5.555_555_555_6)
	})

	it('should not modify numbers with less than 10 fractional digits', () => {
		expect(roundNum(5.555_555_555)).toBe(5.555_555_555)
	})
})

describe('UnitValues - Rav Haim Naeh', () => {
	const unitValues = new UnitValues('גרח')
	it('should have the correct values', () => {
		expect(unitValues.etzba).toBe(0.02)
		expect(unitValues.tefach).toBe(0.08)
		expect(unitValues.sit).toBe(0.16)
		expect(unitValues.amah).toBe(0.48)
		expect(unitValues.zeret).toBe(0.24)
		expect(unitValues.mil).toBe(960)
		expect(unitValues.parsa).toBe(3840)
		expect(unitValues.ris).toBe(128)
	})
})

describe('UnitValues - Hazon Ish', () => {
	const unitValues = new UnitValues('חזון_איש')
	it('should have the correct values', () => {
		expect(unitValues.etzba).toBe(0.024)
		expect(unitValues.tefach).toBe(0.096)
		expect(unitValues.sit).toBe(0.192)
		expect(unitValues.amah).toBe(0.576)
		expect(unitValues.zeret).toBe(0.288)
		expect(unitValues.mil).toBe(1152)
		expect(unitValues.parsa).toBe(4608)
		expect(unitValues.ris).toBe(153.6)
	})
})
