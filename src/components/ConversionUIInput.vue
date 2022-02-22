<script>
export default {
	props: {
		overrideValue: {
			type: Number,
			required: false,
			default: 0,
		},
		unitName: {
			type: String,
			required: true,
		},
	},

	emits: ['value-change'],

	data() {
		return {
			value: this.overrideValue,
		}
	},

	methods: {
		valueChanged(event) {
			this.value = event.target.value
			this.$emit('value-change', this.value)
		}
	}
}
</script>

<template>
	<div class="wrapper-column">
		<span class="centered">{{ unitName }}</span>
		<input
			class="conversion-input"
			v-model="value"
			@input="valueChanged"
		>
	</div>
</template>

<style scoped>
	.wrapper-column {
		display: flex;
		flex-direction: column;
	}

	.centered {
		text-align: center;
	}

	.conversion-input {
		margin: 1em 3em;
	}
</style>
