<script>
import SelectRabi from './components/SelectRabi.vue'
import UnitConversionTable from './components/UnitConversionTable.vue'

export default {
	name: 'App',
	components: {
		SelectRabi,
		UnitConversionTable,
	},
	data() {
		return {
			ruler: 'גרח',
		}
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

		rulerName() {
			switch (this.ruler) {
				case 'חזון_איש':
					return 'חזון איש'
				case 'גרח':
				default:
					return 'רב חיים נאה'
			}
		},
	},
}
</script>

<template>
	<h1>מחשבון יחידות תלמודיות</h1>
	<SelectRabi
		:default-ruler="ruler"
		@ruler-change="newRuler => ruler = newRuler"
	/>
	<UnitConversionTable :ruler="ruler" />
</template>
