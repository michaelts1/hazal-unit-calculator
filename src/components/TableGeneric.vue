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

	data() {
		return {
			width: window.innerWidth,
		}
	},

	computed: {
		lowWidth() { return this.width < 1085 },
	},

	mounted() { window.addEventListener('resize', this.updateWidth) },
	unmounted() { window.removeEventListener('resize', this.updateWidth) },

	methods: {
		updateWidth() {
			this.width = window.innerWidth
		},
	},
})
</script>

<template>
	<div
		v-if="lowWidth"
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

	<table v-else>
		<thead>
			<tr>
				<th
					v-for="unit in units"
					:key="unit.id"
				>
					{{ unit.name }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					v-for="unit in units"
					:key="unit.id"
				>
					{{ formatNum(unit.value) }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
