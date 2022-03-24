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
					v-for="{ name } in units"
					:key="name"
				>
					{{ name }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					v-for="{ value } in units"
					:key="value"
				>
					{{ formatNum(value) }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
	.centered {
		margin: 0 auto;
		text-align: center;
	}

	.wrapper-row {
		display: flex;
		margin: 1em auto;
		width: fit-content;
	}

	.wrapper-column {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
