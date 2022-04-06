<script lang="ts">
import type { DefaultUnits, Unit } from '../types'
import { defineComponent, PropType } from 'vue'
import CalculatorComponent from './CalculatorComponent.vue'
import TableGeneric from './TableGeneric.vue'
import TableGenericLowWidth from './TableGenericLowWidth.vue'

export default defineComponent({
	components: {
		CalculatorComponent,
		TableGeneric,
		TableGenericLowWidth,
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

	data() {
		return {
			width: window.innerWidth,
		}
	},

	computed: {
		lowWidth() {
			return this.width < 1085
		},
	},

	mounted() {
		window.addEventListener('resize', this.updateWidth)
	},

	unmounted() {
		window.removeEventListener('resize', this.updateWidth)
	},

	methods: {
		updateWidth() {
			this.width = window.innerWidth
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

	<TableGenericLowWidth
		v-if="lowWidth"
		:units="units.filter(unit => !unit.hidden)"
		:format-num="formatNum"
	/>
	<TableGeneric
		v-else
		:units="units.filter(unit => !unit.hidden)"
		:format-num="formatNum"
	/>
</template>
