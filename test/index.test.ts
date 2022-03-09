import { describe, expect, it } from 'vitest'

document.body.innerHTML = '<div id="app"></div>'

// Dynamically import script only after creating its mount point
const app = await import('../src/index')

describe('App', () => {
	it('exists', () => {
		expect(app).toBeTruthy()
	})
})
