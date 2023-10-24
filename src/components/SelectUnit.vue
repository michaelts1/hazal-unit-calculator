<script lang="ts">
import { PropType, defineComponent } from 'vue'
import type { Unit } from '../types'

export default defineComponent({
	props: {
		selectedUnit: {
			type: String,
			required: true,
		},
		units: {
			type: Array as PropType<Unit[]>,
			required: true,
		},
	},

	emits: ['value-change'],

	methods: {
		onChange({ target }: Event) { this.$emit('value-change', (target as HTMLSelectElement).value) },
	},
})
</script>

<template>
	<select
		:value="selectedUnit"
		@change="onChange"
	>
		<option
			v-for="unit in units"
			:key="unit.id"
			:value="unit.id"
		>
			{{ unit.name }}
		</option>
	</select>
</template>
