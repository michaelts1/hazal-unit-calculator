<script>

export default {
	props: {
		ruler: {
			type: String,
			default: 'גרח',
		},
	},
	computed: {
		// Base unit is meter
		etzba() {
			switch (this.ruler) {
				case 'חזון_איש':
					return 0.024
				case 'גרח':
				default:
					return 0.02
			}
		},
		tefach() { return 4 * this.etzba },
		sit() { return 2 * this.tefach },
		zeret() { return 0.5 * this.amah },
		amah() { return 6 * this.tefach },
		ris() { return 2/15 * this.mil },
		mil() { return 2000 * this.amah },
		parsa() { return 4 * this.mil },
	},
	methods: {
		/**
		 * @param {number} num
		 * @returns {string}
		 */
		formatNum(num) {
			let format = 'מטר'

			console.log(num)
			console.log(num*100)

			if (num < 0.01) {
				num *= 1000
				format = ' מ"מ'
			} else if (num < 1) {
				num *= 100
				format = ' ס"מ'
			} else if (num > 1000) {
				num /= 1000
				format = ' ק"מ'
			} else {
				format = ' מטר'
			}

			return Math.round(num * 10_000) / 10_000 + format
		},
	},
}
</script>

<template>
	<h6>הערה: הסיט מוצג לפי שיטת הרמב"ם</h6>

	<table>
		<thead>
			<tr>
				<th>אצבע</th>
				<th>טפח</th>
				<th>סיט</th>
				<th>זרת</th>
				<th>אמה</th>
				<th>ריס</th>
				<th>מיל</th>
				<th>פרסה</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{ formatNum(etzba) }}</td>
				<td>{{ formatNum(tefach) }}</td>
				<td>{{ formatNum(sit) }}</td>
				<td>{{ formatNum(zeret) }}</td>
				<td>{{ formatNum(amah) }}</td>
				<td>{{ formatNum(ris) }}</td>
				<td>{{ formatNum(mil) }}</td>
				<td>{{ formatNum(parsa) }}</td>
			</tr>
		</tbody>
	</table>
</template>
