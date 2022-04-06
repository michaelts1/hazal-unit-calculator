<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Ruler } from '../types'

export default defineComponent({
	props: {
		defaultRuler: {
			type: String as PropType<Ruler>,
			default: 'גרח',
		},
	},

	emits: ['ruler-change'],

	data() {
		return {
			value: this.defaultRuler,
		}
	},
})
</script>

<template>
	<span>
		<label for="ruler-select">שיטת פסיקה:</label>
		<select
			id="ruler-select"
			v-model="value"
			class="form-select"
			@change="$emit('ruler-change', value)"
		>
			<option value="גרח">
				רב חיים נאה
			</option>
			<option value="חזון_איש">
				חזון איש
			</option>
		</select>
	</span>
</template>
