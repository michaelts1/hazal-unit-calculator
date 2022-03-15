<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InputAmount from './InputAmount.vue'
import { roundNum } from '../helpers'
import SelectUnit from './SelectUnit.vue'
import type { Unit } from '../types'

export default defineComponent({
	components: {
		InputAmount,
		SelectUnit,
	},

	props: {
		units: {
			type: Array as PropType<Unit[]>,
			required: true,
		},
	},

	data() {
		return {
			input: { unit: 'טפח', value: 0 },
			output: { unit: 'סנטימטר', value: 0 },
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
		formatNum(num: number): string {
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
		convertToMeters(amount: number, sourceUnit: string) {
			const unit = this.units.filter(({ name }) => name === sourceUnit)[0]
			return unit.value * amount
		},

		/**
		 * Converts metric measurements to other units
		 * @param {number} meters
		 * @param {string} targetUnit Name of the target unit of measurement
		 */
		convertFromMeters(meters: number, targetUnit: string) {
			const unit = this.units.filter(({ name }) => name === targetUnit)[0]
			return meters / unit.value
		},

		/**
		 * Updates output with a new value
		 * @param {number} meters New value (in meters)
		 */
		updateOutputValue(meters: number) {
			const outputValue = this.convertFromMeters(meters, this.output.unit)
			this.output.value = roundNum(outputValue)
		},

		/**
		 * Called after the input value has changed
		 * @param {number} newValue New value of the input
		 */
		inputValueChanged(newValue: number) {
			this.input.value = newValue
			const meters = this.convertToMeters(newValue, this.input.unit)
			this.updateOutputValue(meters)
		},

		/**
		 * Called after the input unit of measurement has changed
		 * @param {string} newUnit Name of the new unit
		 */
		InputUnitChanged(newUnit: string) {
			this.input.unit = newUnit

			const meters = this.convertToMeters(this.input.value, newUnit)
			this.updateOutputValue(meters)
		},

		/**
		 * Called after the output unit of measurement has changed
		 * @param {string} newUnit Name of the new unit
		 */
		OutputUnitChanged(newUnit: string) {
			const meters = this.convertToMeters(this.output.value, this.output.unit)
			this.output.unit = newUnit
			this.updateOutputValue(meters)
		},
	},
})
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
		<div class="wrapper-column">
			<SelectUnit
				class="centered"
				:unit-names="unitNames"
				:selected-unit="input.unit"
				@value-change="newUnit => InputUnitChanged(newUnit)"
			/>
			<InputAmount
				size="12"
				:value="input.value"
				@value-change="inputValueChanged"
			/>
		</div>
		<div class="wrapper-column">
			=
		</div>
		<div class="wrapper-column">
			<SelectUnit
				class="centered"
				:unit-names="unitNames"
				:selected-unit="output.unit"
				@value-change="newUnit => OutputUnitChanged(newUnit)"
			/>
			<InputAmount
				size="12"
				:disabled="true"
				:value="output.value"
			/>
		</div>
	</div>
</template>

<style scoped>
	.centered {
		margin: 0 auto;
		text-align: center;
	}

	.wrapper-row {
		display: flex;
		margin: 1em auto;
		width: fit-content;
	}

	.wrapper-column {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
