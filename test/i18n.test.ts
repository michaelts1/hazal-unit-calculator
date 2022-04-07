import { describe, expect, it } from 'vitest'
import { i18n } from '../src/i18n'

describe('i18n', () => {
	it('defaults to Hebrew', () => {
		expect(i18n.currentLocale).toBe('he')
	})

	it('gets the correct message', () => {
		expect(i18n.t('_dir')).toBe(i18n.messages._dir)
		expect(i18n.t('amah')).toBe(i18n.messages.amah)
	})

	it('switches locales correctly', () => {
		i18n.changeLocale('en')
		expect(i18n.currentLocale).toBe('en')
	})

	it("doesn't change to non-existing locales", () => {
		/* eslint-disable-line @typescript-eslint/ban-ts-comment */ // @ts-ignore
		expect(() => i18n.changeLocale('abc')).toThrow()
	})
})
