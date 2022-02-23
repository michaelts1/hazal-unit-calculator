<script>
export default {
	props: {
		value: {
			type: Number,
			required: true,
		},
		selectedUnit: {
			type: String,
			required: true,
		},
		unitNames: {
			/** @type {string[]} */
			type: Array,
			required: true,
		},
	},

	emits: [
		'input-value-change',
		'select-value-change',
	],

	data() {
		return {
			valid: true,
		}
	},

	/*
		Why are we using a computed property for storing the value,
		instead of just using `this.value`?

		In Vue, components get updated whenever the component data changes.

			In this case, this means that when the value of the input in the
		DOM is not the same as the value in the props (e.g. when the DOM value
		is invalid, and thus gets ignored by the component), the DOM value will
		get overwritten by the 'real' value from the props while updating.

			Unfortunately, this will also delete the most recent user input,
		since that input does not yet exist in the props.

			To avoid this from happening, we use a computed property that is
		always updated to be equal to the DOM value, and will only get
		overwritten by the props value when `this.value` changes, and not when
		any other part of the component data changes.
	 */
	computed: {
		domValue() { return this.value },
	},

	methods: {
		/**
		 * Converts string number to numbers if possible, and throws
		 * an error if the string isn't a valid number
		 * @param {string} str
		 * @returns {number}
		 */
		numberFromString(str) {
			const num = +str.replace(/,/g, '')
			if (!Number.isFinite(num)) {
				throw new TypeError('Invalid number received')
			} else {
				return num
			}
		},

		/**
		 * Updates the validity status of the input
		 * @param {HTMLInputElement} target
		 * @param {msg} target
		 */
		changeValidity(target, msg) {
			target.setCustomValidity(msg)
			target.reportValidity()
			this.valid = msg === ''
		},

		/**
		 * Checks the validity of the input field and emits the new
		 * value to the parent component
		 * @param {InputEvent} event
		 */
		inputValueChanged({ target }) {
			try {
				const value = this.numberFromString(target.value)
				this.$emit('input-value-change', {
					unit: this.selectedUnit,
					value,
				})

				this.changeValidity(target, '')
			} catch (err) {
				this.changeValidity(target, 'נא הכנס מספר')
				console.log('Ignoring invalid number input')
			}
		},
	},
}
</script>

<template>
	<div class="wrapper-column">
		<select
			:value="selectedUnit"
			class="centered"
			@change="({ target }) => $emit('select-value-change', target.value)"
		>
			<option
				v-for="name in unitNames"
				:key="name"
				:value="name"
			>
				{{ name }}
			</option>
		</select>
		<input
			v-model="domValue"
			:class="{ 'conversion-input': true, 'invalid': !valid }"
			size="12"
			@input="inputValueChanged"
		>
	</div>
</template>

<style scoped lang="scss">
	.wrapper-column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.centered {
		margin: 0 auto;
		text-align: center;
	}

	.conversion-input {
		margin: 1em 3em;

		&.invalid {
			box-shadow: #b88 1px 1px 3px 2px;
			&:focus {
				box-shadow: #b88 0 -1px 3px 5px;
			}
		}
	}
</style>
