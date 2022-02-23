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

	methods: {
		numberInput(str) {
			const num = +str.replace(/,/g, '')
			if (!Number.isFinite(num)) {
				throw new TypeError('Invalid number received')
			} else {
				return num
			}
		},

		changeValidity(target, msg) {
			target.setCustomValidity(msg)
			msg ?
				target.classList.add('invalid') :
				target.classList.remove('invalid')
			target.reportValidity()
		},

		inputValueChanged({ target }) {
			try {
				const value = this.numberInput(target.value)
				if (typeof value !== 'number') return

				this.$emit('input-value-change', {
					unit: this.selectedUnit,
					value,
				})
				this.changeValidity(target, '')
			} catch (err) {
				this.changeValidity(target, 'נא הכנס מספר')
				console.warn('Ignoring number input due to error:', err.message)
			}
		},

		selectValueChanged({ target }) {
			console.log(target.value)
			this.$emit('select-value-change', target.value)
		},
	},
}
</script>

<template>
	<div class="wrapper-column">
		<select
			:value="selectedUnit"
			class="centered"
			@change="selectValueChanged"
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
			:value="value"
			class="conversion-input"
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
