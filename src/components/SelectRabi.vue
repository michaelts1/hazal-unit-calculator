<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { i18n } from '../i18n'
import type { Ruler } from '../types'

export default defineComponent({
	props: {
		defaultRuler: {
			type: String as PropType<Ruler>,
			default: 'grach',
		},
	},

	emits: ['ruler-change'],

	data() {
		return {
			i18n,
			value: this.defaultRuler,
		}
	},
})
</script>

<template>
	<span>
		<label for="ruler-select">{{ i18n.t('posek') }}:</label>
		<select
			id="ruler-select"
			v-model="value"
			class="form-select"
			@change="$emit('ruler-change', value)"
		>
			<option value="grach">
				{{ i18n.t('grach') }}
			</option>
			<option value="chazonIsh">
				{{ i18n.t('chazonIsh') }}
			</option>
		</select>
	</span>
</template>
