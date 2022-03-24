<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Ruler, Unit } from '../types'
import CalculatorComponent from './CalculatorComponent.vue'
import { roundNum } from '../helpers'
import TableGeneric from './TableGeneric.vue'

class UnitValues {
	// Base unit is liter
	beitza: .0576 | .09953
	kortov: number
	grogeret: number
	zait: number
	//peras: number
	litra: number
	log: number
	kav: number
	seah: number
	eifa: number
	kur: number

	constructor(ruler: Ruler) {
		// Base unit is meter
		this.beitza = ruler === 'חזון_איש' ? .09953 : .0576
		this.grogeret = 1/3 * this.beitza
		this.zait = 0.5 * this.beitza
		this.log = 6 * this.beitza
		//this.peras = number
		this.kortov = 1/64 * this.log
		this.litra = 0.5 * this.log
		this.kav = 24 * this.beitza
		this.seah = 6 * this.kav
		this.eifa = 3 * this.seah
		this.kur = 10 * this.eifa
	}
}

export default defineComponent({
	components: {
		CalculatorComponent,
		TableGeneric,
	},

	props: {
		ruler: {
			type: String as PropType<Ruler>,
			required: true,
		},
	},

	data() {
		return {
			defaultUnits: {
				input: 'זית',
				output: 'סמ"ק',
			},
		}
	},

	computed: {
		units(): Unit[] {
			const unitValues = new UnitValues(this.ruler)
			return [
				{ hidden: true, name: 'סמ"ק', value: 0.001 },
				{ hidden: true, name: 'ליטר', value: 1 },
				{ hidden: true, name: 'מ"ק', value: 1000 },
				{ hidden: false, name: 'קורטוב', value: unitValues.kortov },
				{ hidden: false, name: 'גרוגרת', value: unitValues.grogeret },
				{ hidden: false, name: 'זית', value: unitValues.zait },
				{ hidden: false, name: 'ביצה', value: unitValues.beitza },
				//{ hidden: false, name: 'פרס', value: unitValues.peras },
				{ hidden: false, name: 'ליטרא', value: unitValues.litra },
				{ hidden: false, name: 'לוג', value: unitValues.log },
				{ hidden: false, name: 'קב', value: unitValues.kav },
				{ hidden: false, name: 'סאה', value: unitValues.seah },
				{ hidden: false, name: 'איפה', value: unitValues.eifa },
				{ hidden: false, name: 'כור', value: unitValues.kur },
			]
		},
	},

	methods: {
		formatNum(num: number) {
			let unit = ' ליטר'

			if (num < 1) {
				num *= 1000
				unit = ' סמ"ק'
			} else if (num > 1000) {
				num /= 1000
				unit = ' מ"ק'
			}

			return roundNum(num, 2) + unit
		},
	},
})
</script>

<template>
	<h6>שים לב: הפרס מחושב לפי שיטת רבי שמעון(?) והביצה כחצי זית</h6>
	<TableGeneric
		:units="units.filter(unit => !unit.hidden)"
		:format-num="formatNum"
	/>

	<CalculatorComponent
		:units="units"
		:default-units="defaultUnits"
	/>
</template>
