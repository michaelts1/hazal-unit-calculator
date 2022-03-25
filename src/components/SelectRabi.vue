<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		defaultRuler: {
			type: String,
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
		<label for="ruler-select">שיטת מדידה:</label>
		<select
			id="ruler-select"
			v-model="value"
			class="form-select"
			@change="$emit('ruler-change', value)"
		>
			<option value="גרח">
				גר"ח (רב חיים נאה)
			</option>
			<option value="חזון_איש">
				חזון איש
			</option>
		</select>
	</span>
</template>

<style lang="scss" scoped>
	#ruler-select {
		display: inline-block;
		margin: 0 5px;
		padding-right: 30px;
		width: unset;
	}
</style>
