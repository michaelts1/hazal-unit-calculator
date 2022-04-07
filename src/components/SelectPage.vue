<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { i18n } from '../i18n'
import type { Page } from '../types'

export default defineComponent({
	props: {
		defaultPage: {
			type: String as PropType<Page>,
			default: 'length',
		},
	},

	emits: ['page-change'],

	data() {
		return {
			i18n,
		}
	},

	methods: {
		onChange({ target }: Event) { this.$emit('page-change', (target as HTMLSelectElement).value) },
	},
})
</script>

<template>
	<span>
		<label for="page-select">{{ i18n.t('type') }}:</label>
		<select
			id="page-select"
			:value="defaultPage"
			class="form-select"
			@change="onChange"
		>
			<option value="length">
				{{ i18n.t('length') }}
			</option>
			<option value="volume">
				{{ i18n.t('volume') }}
			</option>
		</select>
	</span>
</template>
