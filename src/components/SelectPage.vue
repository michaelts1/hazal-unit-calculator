<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Page } from '../types'

export default defineComponent({
	props: {
		defaultPage: {
			type: String as PropType<Page>,
			default: 'length',
		},
	},

	emits: ['page-change'],

	methods: {
		onChange({ target }: Event) { this.$emit('page-change', (target as HTMLSelectElement).value) },
	},
})
</script>

<template>
	<span>
		<label for="page-select">תחום:</label>
		<select
			id="page-select"
			:value="defaultPage"
			class="form-select"
			@change="onChange"
		>
			<option value="length">
				מרחק
			</option>
			<option value="volume">
				נפח
			</option>
		</select>
	</span>
</template>
