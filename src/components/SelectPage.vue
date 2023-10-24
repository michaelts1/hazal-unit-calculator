<script lang="ts">
import { MessageName, i18n } from '../i18n'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
	props: {
		defaultPage: {
			type: String,
			default: 'length',
		},
		pages: {
			type: Array as PropType<MessageName[]>,
			required: true,
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
			<option
				v-for="page of pages"
				:key="page"
				:value="page"
			>
				{{ i18n.t(page) }}
			</option>
		</select>
	</span>
</template>
