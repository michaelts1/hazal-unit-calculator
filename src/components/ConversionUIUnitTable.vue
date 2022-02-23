<script>
import ConversionUIInput from './ConversionUIInput.vue'

const roundNum = num => Math.round(num * 10_000) / 10_000

export default {
	components: {
		ConversionUIInput,
	},

	props: {
		units: {
			/** @type {Array.<{ name: string, value: number }>} */
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			inputs: [
				{
					value: 0,
					unit: 'אצבע',
				},
				{
					value: 0,
					unit: 'טפח',
				},
			],
		}
	},

	methods: {
		formatNum(num) {
			let unit = ' מטר'

			if (num < 0.01) {
				num *= 1000
				unit = ' מ"מ'
			} else if (num < 1) {
				num *= 100
				unit = ' ס"מ'
			} else if (num > 1000) {
				num /= 1000
				unit = ' ק"מ'
			}

			return roundNum(num) + unit
		},

		convertToMeters(amount, sourceUnit) {
			const unit = this.units.filter(({ name }) => name === sourceUnit)[0]
			return unit.value * amount
		},

		convertFromMeters(meters, targetUnit) {
			const unit = this.units.filter(({ name }) => name === targetUnit)[0]
			return meters / unit.value
		},

		inputValueChanged(data) {
			console.log(data.unit, data.value)
			const value = this.convertToMeters(data.value, data.unit)
			for (const input of this.inputs) {
				input.value = roundNum(this.convertFromMeters(value, input.unit))
			}
		},
	},
}
</script>

<template>
	<table>
		<thead>
			<tr>
				<th
					v-for="{ name } in units"
					:key="name"
				>
					{{ name }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					v-for="{ value } in units"
					:key="value"
				>
					{{ formatNum(value) }}
				</td>
			</tr>
		</tbody>
	</table>

	<div class="wrapper-row">
		<ConversionUIInput
			:unit-name="inputs[0].unit"
			:value="inputs[0].value"
			@value-change="inputValueChanged"
		/>
		<span><br> = </span>
		<ConversionUIInput
			:unit-name="inputs[1].unit"
			:value="inputs[1].value"
			@value-change="inputValueChanged"
		/>
	</div>
</template>

<style scoped>
	.wrapper-row {
		display: flex;
		margin: 1em auto;
		width: fit-content;
	}
</style>
