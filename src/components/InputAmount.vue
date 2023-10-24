<script lang="ts">
import { debounce, roundNum } from '../helpers'
import { defineComponent } from 'vue'
import { i18n } from '../i18n'

export default defineComponent({
	props: {
		value: {
			type: Number,
			required: true,
		},
		disabled: {
			type: Boolean,
		},
	},

	emits: ['value-change'],

	data() {
		return {
			domValue: String(this.value),
			valid: true,
		}
	},

	computed: {
		debouncedInputValueChanged() {
			return debounce(this.inputValueChanged, 500)
		},

		disabledValue() {
			let digits = 10
			if (this.value > 1) {
				digits = 4
			} else if (this.value > 1e-2) {
				digits = 5
			} else if (this.value > 1e-4) {
				digits = 8
			}

			return this.value.toLocaleString(undefined, { maximumFractionDigits: digits })
		},

		usedValue() {
			return this.disabled ? this.disabledValue : this.domValue
		},
	},

	/*
		Why are we using a data property for storing the value and update it
		when the props value changes, instead of just using `this.value`?

		In Vue, components get updated whenever their component data changes.

			In this case, this means that when the value of the input in the
		DOM is not the same as the value in the props (e.g. when the DOM value
		is invalid, and thus gets ignored by the component), the DOM value will
		get overwritten by the 'real' value from the props while updating.

			Unfortunately, this will also delete the most recent user input,
		since that input does not yet exist in the props.

			To avoid this from happening, we use a data property that is
		always updated to be equal to the DOM value, and will only get
		overwritten by the props value when `this.value` changes, and not when
		any other part of the component changes.
	 */
	watch: {
		value(newValue: number) { this.domValue = String(newValue) },
	},

	methods: {
		/** Updates the validity status of the input */
		changeValidity(target: HTMLInputElement, msg: string) {
			target.setCustomValidity(msg)
			target.reportValidity()
			this.valid = msg === ''
		},

		/** Checks the validity of the input field and emits the new value to the parent component */
		inputValueChanged(event: Event) {
			const target = event.target as HTMLInputElement
			this.domValue = target.value

			const valueStr = this.domValue.replace(/,/g, '')

			/* Don't invalidate yet - the user might enter a
				digit, making the input a valid simple fraction */
			if (`${parseFloat(valueStr)}/` === valueStr) {
				console.log('Ignoring incomplete simple fraction')
				return
			}

			const fractionMatchArray = valueStr.match(/([\d.]+) ?\/ ?([\d.]+)/)
			let value = +valueStr

			if (fractionMatchArray) {
				// Handle simple fractions
				value = +fractionMatchArray[1] / +fractionMatchArray[2]
				value = roundNum(value, 5)
			}

			if (!Number.isFinite(value)) {
				this.changeValidity(target, i18n.t('invalidNumber'))
				console.log('Ignoring invalid number input')
				return
			}

			this.$emit('value-change', value)
			this.changeValidity(target, '')
		},
	},
})
</script>

<template>
	<input
		:class="{ 'input-amount': true, 'invalid': !valid }"
		:disabled="disabled"
		:value="usedValue"
		@input="debouncedInputValueChanged"
	>
</template>
