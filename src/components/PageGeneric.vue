<script lang="ts">
import type { DefaultUnits, Unit } from '../types'
import { defineComponent, PropType } from 'vue'
import CalculatorComponent from './CalculatorComponent.vue'
import TableGeneric from './TableGeneric.vue'

export default defineComponent({
	components: {
		CalculatorComponent,
		TableGeneric,
	},

	props: {
		defaultUnits: {
			type: Object as PropType<DefaultUnits>,
			required: true,
		},
		formatNum: {
			type: Function as PropType<(n: number) => string>,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		units: {
			type: Array as PropType<Unit[]>,
			required: true,
		},
	},
})
</script>

<template>
	<CalculatorComponent
		:units="units"
		:default-units="defaultUnits"
	/>

	<h6> {{ message }} </h6>

	<TableGeneric
		:units="units.filter(unit => !unit.hidden)"
		:format-num="formatNum"
	/>
</template>
