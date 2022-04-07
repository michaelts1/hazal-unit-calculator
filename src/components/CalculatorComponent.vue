<script lang="ts">
import type { DefaultUnits, Unit } from '../types'
import { defineComponent, PropType } from 'vue'
import { i18n } from '../i18n'
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
			i18n,
			input: { unit: this.defaultUnits.input, value: 0 },
			output: { unit: this.defaultUnits.output, value: 0 },
		}
	},

	watch: {
		units() {
			this.inputValueChanged(this.input.value)
		},
	},

	methods: {
		/** Converts measurements done using other units to metric */
		convertToMeters(amount: number, sourceUnit: string) {
			const unit = this.units.filter(({ id }) => id === sourceUnit)[0]
			return unit.value * amount
		},

		/** Converts metric measurements to other units */
		convertFromMeters(meters: number, targetUnit: string) {
			const unit = this.units.filter(({ id }) => id === targetUnit)[0]
			return meters / unit.value
		},

		/** Updates output with a new value */
		updateOutputValue(meters: number) {
			const outputValue = this.convertFromMeters(meters, this.output.unit)
			this.output.value = roundNum(outputValue)
		},

		inputValueChanged(newValue: number) {
			this.input.value = newValue
			const meters = this.convertToMeters(newValue, this.input.unit)
			this.updateOutputValue(meters)
		},

		InputUnitChanged(newUnit: string) {
			this.input.unit = newUnit

			const meters = this.convertToMeters(this.input.value, newUnit)
			this.updateOutputValue(meters)
		},

		OutputUnitChanged(newUnit: string) {
			const meters = this.convertToMeters(this.output.value, this.output.unit)
			this.output.unit = newUnit
			this.updateOutputValue(meters)
		},

		swapInputOutput() {
			const { input, output } = this
			this.input = output
			this.output = input
		},
	},
})
</script>

<template>
	<div class="wrapper-row calculator">
		<div class="wrapper-column">
			<h5> {{ i18n.t('input') }} </h5>
			<div>
				<InputAmount
					class="form-control form-control-sm"
					size="1"
					:value="input.value"
					@value-change="inputValueChanged"
				/>
				<SelectUnit
					class="form-select"
					:units="units"
					:selected-unit="input.unit"
					@value-change="newUnit => InputUnitChanged(newUnit)"
				/>
			</div>
		</div>

		<div class="wrapper-column">
			&nbsp;
			<button
				class="btn btn-light"
				type="button"
				:title="i18n.t('switchInputOutput')"
				:aria-label="i18n.t('switchInputOutput')"
				@click="swapInputOutput"
			>
				<img src="/swap.svg">
			</button>
		</div>

		<div class="wrapper-column">
			<h5> {{ i18n.t('output') }} </h5>
			<div>
				<InputAmount
					class="form-control form-control-sm"
					size="1"
					:disabled="true"
					:value="output.value"
				/>
				<SelectUnit
					class="form-select"
					:units="units"
					:selected-unit="output.unit"
					@value-change="newUnit => OutputUnitChanged(newUnit)"
				/>
			</div>
		</div>
	</div>
</template>
