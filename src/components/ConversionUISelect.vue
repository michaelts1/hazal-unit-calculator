<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	props: {
		selectedUnit: {
			type: String,
			required: true,
		},
		unitNames: {
			type: Array as PropType<string[]>,
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
			v-for="name in unitNames"
			:key="name"
			:value="name"
		>
			{{ name }}
		</option>
	</select>
</template>
