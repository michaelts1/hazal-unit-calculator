<script lang="ts">
import { defineComponent } from 'vue'

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
			valid: true,
			domValue: this.value,
		}
	},

	computed: {
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
		value: function(newValue) { this.domValue = newValue },
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

			const value = +target.value.replace(/,/g, '')
			if (!Number.isFinite(value)) {
				this.changeValidity(target, 'נא הכנס מספר')
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
		v-if="disabled"
		:value="disabledValue"
		class="conversion-input"
		disabled
	>
	<input
		v-else
		v-model="domValue"
		:class="{ 'conversion-input': true, 'invalid': !valid }"
		@input="inputValueChanged"
	>
</template>

<style scoped lang="scss">
	.conversion-input {
		margin: 1em 3em;

		&.invalid {
			box-shadow: #b88 1px 1px 3px 2px;
			&:focus {
				box-shadow: #b88 0 -1px 3px 5px;
			}
		}
		&:disabled {
			color: black;
		}
	}
</style>
