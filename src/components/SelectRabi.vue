<script>
export default {
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
}
</script>

<template>
	<label for="ruler-select">שיטת מדידה: </label>
	<select
		id="ruler-select"
		v-model="value"
		@change="$emit('ruler-change', value)"
	>
		<option value="גרח">
			גר"ח (רב חיים נאה)
		</option>
		<option value="חזון_איש">
			חזון איש
		</option>
	</select>
</template>
