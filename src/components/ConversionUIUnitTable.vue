<script>

export default {
	props: {
		ruler: {
			type: String,
			default: 'גרח',
		},
		units: {
			type: Array, /* { name: string, value: number }[] */
			required: true,
		},
	},

	methods: {
		formatNum(num) {
			let unit = ' מטר'

			if (num < 0.01) {
				num *= 1000
				unit = ' מ"מ'
			} else if (num < 1) {
				num *= 100
				unit = ' ס"מ'
			} else if (num > 1000) {
				num /= 1000
				unit = ' ק"מ'
			}

			return Math.round(num * 10_000) / 10_000 + unit
		},
	},
}
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
