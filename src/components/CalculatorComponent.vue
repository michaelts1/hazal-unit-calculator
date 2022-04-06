<script lang="ts">
import type { DefaultUnits, Unit } from '../types'
import { defineComponent, PropType } from 'vue'
import InputAmount from './InputAmount.vue'
import { roundNum } from '../helpers'
import SelectUnit from './SelectUnit.vue'

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
		defaultUnits: {
			type: Object as PropType<DefaultUnits>,
			required: true,
		},
	},

	data() {
		return {
			input: { unit: this.defaultUnits.input, value: 0 },
			output: { unit: this.defaultUnits.output, value: 0 },
		}
	},

	computed: {
		unitNames() { return this.units.map(unit => unit.name) },
	},

	watch: {
		units() {
			this.inputValueChanged(this.input.value)
		},
	},

	methods: {
		/** Converts measurements done using other units to metric */
		convertToMeters(amount: number, sourceUnit: string) {
			const unit = this.units.filter(({ name }) => name === sourceUnit)[0]
			return unit.value * amount
		},

		/** Converts metric measurements to other units */
		convertFromMeters(meters: number, targetUnit: string) {
			const unit = this.units.filter(({ name }) => name === targetUnit)[0]
			return meters / unit.value
		},

		/** Updates output with a new value */
		updateOutputValue(meters: number) {
			const outputValue = this.convertFromMeters(meters, this.output.unit)
			this.output.value = roundNum(outputValue)
		},

		/** Called after the input value has changed */
		inputValueChanged(newValue: number) {
			this.input.value = newValue
			const meters = this.convertToMeters(newValue, this.input.unit)
			this.updateOutputValue(meters)
		},

		/** Called after the input unit of measurement has changed */
		InputUnitChanged(newUnit: string) {
			this.input.unit = newUnit

			const meters = this.convertToMeters(this.input.value, newUnit)
			this.updateOutputValue(meters)
		},

		/** Called after the output unit of measurement has changed */
		OutputUnitChanged(newUnit: string) {
			const meters = this.convertToMeters(this.output.value, this.output.unit)
			this.output.unit = newUnit
			this.updateOutputValue(meters)
		},
	},
})
</script>

<template>
	<div class="wrapper-row calculator">
		<div class="wrapper-column">
			<InputAmount
				class="form-control form-control-sm"
				size="1"
				:value="input.value"
				@value-change="inputValueChanged"
			/>
			<SelectUnit
				class="form-select"
				:unit-names="unitNames"
				:selected-unit="input.unit"
				@value-change="newUnit => InputUnitChanged(newUnit)"
			/>
		</div>
		<div class="wrapper-column">
			=
		</div>
		<div class="wrapper-column">
			<InputAmount
				class="form-control form-control-sm"
				size="1"
				:disabled="true"
				:value="output.value"
			/>
			<SelectUnit
				class="form-select"
				:unit-names="unitNames"
				:selected-unit="output.unit"
				@value-change="newUnit => OutputUnitChanged(newUnit)"
			/>
		</div>
	</div>
</template>
