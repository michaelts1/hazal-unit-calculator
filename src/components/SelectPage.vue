<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		defaultPage: {
			type: String,
			default: 'length',
		},
	},

	emits: ['page-change'],

	data() {
		return {
			value: this.defaultPage,
		}
	},
})
</script>

<template>
	<span>
		<label for="page-select">תחום:</label>
		<select
			id="page-select"
			v-model="value"
			class="form-select"
			@change="$emit('page-change', value)"
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

<style lang="scss" scoped>
	#page-select {
		display: inline-block;
		margin: 0 5px;
		padding-right: 30px;
		width: unset;
	}
</style>
