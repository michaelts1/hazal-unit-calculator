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
	<table>
		<thead>
			<tr>
				<th
					v-for="unit in units"
					:key="unit.name"
				>
					{{ unit.name }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					v-for="unit in units"
					:key="unit.name"
				>
					{{ formatNum(unit.value) }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
