<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { roundNum } from '../helpers'
import type { Unit } from '../types'

export default defineComponent({
	props: {
		units: {
			type: Array as PropType<Unit[]>,
			required: true,
		},
	},

	methods: {
		/**
		 * Formats unit measurements
		 * @param {number} num
		 * @returns {string}
		 */
		formatNum(num: number): string {
			let unit = ' מטר'

			if (num < .01) {
				num *= 1000
				unit = ' מ"מ'
			} else if (num < 1) {
				num *= 100
				unit = ' ס"מ'
			} else if (num > 1000) {
				num /= 1000
				unit = ' ק"מ'
			}

			return roundNum(num) + unit
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
