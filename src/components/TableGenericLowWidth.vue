<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Unit } from '../types'

export default defineComponent({
	props: {
		units: {
			type: Array as PropType<Unit[]>,
			required: true,
		},
		formatNum: {
			type: Function as PropType<(num: number) => string>,
			required: true,
		},
	},
})
</script>

<template>
	<div
		id="table-low-width"
		class="container"
	>
		<div
			v-for="unit in units"
			:key="unit.name"
			class="row"
		>
			<div class="col">
				{{ unit.name }}
			</div>
			<div class="col">
				{{ formatNum(unit.value) }}
			</div>
		</div>
	</div>
</template>
