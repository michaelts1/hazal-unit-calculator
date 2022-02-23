<script>
import ConversionUIInput from './ConversionUIInput.vue'

/**
 * Round to 6 digits
 * @param {number} num
 * @returns {number}
 */
const roundNum = num => Math.round(num * 1_000_000) / 1_000_000

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
				{ unit: 'אצבע', value: 0 },
				{ unit: 'טפח', value: 0 },
			],
		}
	},

	computed: {
		unitsFiltered() { return this.units.filter(unit => !unit.hidden) },
		unitNames() { return this.units.map(unit => unit.name) },
	},

	methods: {
		/**
		 * Formats unit measurements
		 * @param {number} num
		 * @returns {string}
		 */
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

		/**
		 * Converts measurements done using other units to metric
		 * @param {number} amount Measurement calculated using non-metric units
		 * @param {string} sourceUnit Name of the unit of measurement used
		 */
		convertToMeters(amount, sourceUnit) {
			const unit = this.units.filter(({ name }) => name === sourceUnit)[0]
			return unit.value * amount
		},

		/**
		 * Converts metric measurements to other units
		 * @param {number} meters
		 * @param {string} targetUnit Name of the target unit of measurement
		 */
		convertFromMeters(meters, targetUnit) {
			const unit = this.units.filter(({ name }) => name === targetUnit)[0]
			return meters / unit.value
		},

		/**
		 * Called after the value for one of the inputs has changed
		 * @param {object} data
		 * @param {number} data.value New value of the input
		 * @param {string} data.unit Name of the unit used to measure the value
		 */
		inputValueChanged(data) {
			const meters = this.convertToMeters(data.value, data.unit)
			for (const input of this.inputs) {
				input.value = roundNum(this.convertFromMeters(meters, input.unit))
			}
		},

		/**
		 * Called after the unit of measurement for one of the inputs has changed
		 * @param {number} inputIndex Index of the input that has changed its unit
		 * @param {string} newUnit Name of the new unit
		 */
		selectValueChanged(inputIndex, newUnit) {
			const thisInput = this.inputs[inputIndex]
			thisInput.unit = newUnit

			// Update value for the other input
			const meteres = this.convertToMeters(thisInput.value, newUnit)
			const otherInput = this.inputs[inputIndex ^ 1]
			otherInput.value = roundNum(this.convertFromMeters(meteres, otherInput.unit))
		},
	},
}
</script>

<template>
	<table>
		<thead>
			<tr>
				<th
					v-for="{ name } in unitsFiltered"
					:key="name"
				>
					{{ name }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					v-for="{ value } in unitsFiltered"
					:key="value"
				>
					{{ formatNum(value) }}
				</td>
			</tr>
		</tbody>
	</table>

	<div class="wrapper-row">
		<ConversionUIInput
			:unit-names="unitNames"
			:selected-unit="inputs[0].unit"
			:value="inputs[0].value"
			@input-value-change="inputValueChanged"
			@select-value-change="newUnit => selectValueChanged(0, newUnit)"
		/>
		<span><br> = </span>
		<ConversionUIInput
			:unit-names="unitNames"
			:selected-unit="inputs[1].unit"
			:value="inputs[1].value"
			@input-value-change="inputValueChanged"
			@select-value-change="newUnit => selectValueChanged(1, newUnit)"
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
