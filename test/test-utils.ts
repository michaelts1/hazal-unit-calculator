import { vi } from 'vitest'
import type { DOMWrapper } from '@vue/test-utils'

/**
	A Workaround for `DomWrapper.setValue()` together with `vi.useFakeTimers()`.
		For an unknown reason, when using `setValue` to set an invalid value A, the next
	call to `setValue` will set the value to A again, regardless of the actual parameter
	passed on the second call.
		For this reason, after setting to an invalid value, we call `setValue` again for
	the invalid value. This way, the third call to `setValue` will set the correct value.
*/
export async function setInvalidValue(el: DOMWrapper<Element>, value: unknown) {
	await el.setValue(value)
	vi.runOnlyPendingTimers()
	return el.setValue(value)
}
