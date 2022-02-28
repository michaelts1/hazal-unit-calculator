<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		selectedUnit: {
			type: String,
			required: true,
		},
		unitNames: {
			/** @type {string[]} */
			type: Array,
			required: true,
		},
	},

	emits: ['value-change'],
})
</script>

<template>
	<select
		:value="selectedUnit"
		@change="({ target }) => $emit('value-change', target.value)"
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
