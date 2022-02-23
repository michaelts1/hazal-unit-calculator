<script>
export default {
	props: {
		value: {
			type: Number,
			required: true,
		},
		unitName: {
			type: String,
			required: true,
		},
	},

	emits: ['value-change'],

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

		valueChanged({ target }) {
			try {
				const value = this.numberInput(target.value)
				if (typeof value !== 'number') return

				this.$emit('value-change', {
					unit: this.unitName,
					value,
				})
				this.changeValidity(target, '')
			} catch (err) {
				this.changeValidity(target, 'נא הכנס מספר')
				console.warn('Ignoring number input due to error:', err.message)
			}
		},
	},
}
</script>

<template>
	<div class="wrapper-column">
		<span class="centered">{{ unitName }}</span>
		<input
			:value="value"
			class="conversion-input"
			size="8"
			@input="valueChanged"
		>
	</div>
</template>

<style scoped lang="scss">
	.wrapper-column {
		display: flex;
		flex-direction: column;
	}

	.centered {
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
