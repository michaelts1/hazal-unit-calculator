<script lang="ts">
import type { Ruler, Unit } from '../types'
import CalculatorComponent from './CalculatorComponent.vue'
import { defineComponent } from 'vue'
import LengthTable from './LengthTable.vue'
import { roundNum } from '../helpers'
import SelectRabi from './SelectRabi.vue'

class UnitValues {
	etzba: 0.024 | 0.02
	tefach: number
	sit: number
	zeret: number
	amah: number
	ris: number
	mil: number
	parsa: number

	constructor(ruler: Ruler) {
		// Base unit is meter
		this.etzba  = ruler === 'חזון_איש' ? 0.024 : 0.02
		this.tefach = roundNum(4 * this.etzba)
		this.sit    = roundNum(2 * this.tefach)
		this.amah   = roundNum(6 * this.tefach)
		this.zeret  = roundNum(0.5 * this.amah)
		this.mil    = roundNum(2000 * this.amah)
		this.parsa  = roundNum(4 * this.mil)
		this.ris    = roundNum(2/15 * this.mil)
	}
}

export default defineComponent({
	components: {
		CalculatorComponent,
		LengthTable,
		SelectRabi,
	},

	data() {
		return {
			ruler: 'גרח' as Ruler,
		}
	},

	computed: {
		units(): Unit[] {
			const unitValues = new UnitValues(this.ruler)
			return [
				{ hidden: true, name: 'סנטימטר', value: 0.01 },
				{ hidden: true, name: 'מטר', value: 1 },
				{ hidden: true, name: 'קילומטר', value: 1000 },
				{ hidden: false, name: 'אצבע', value: unitValues.etzba },
				{ hidden: false, name: 'טפח', value: unitValues.tefach },
				{ hidden: false, name: 'סיט', value: unitValues.sit },
				{ hidden: false, name: 'זרת', value: unitValues.zeret },
				{ hidden: false, name: 'אמה', value: unitValues.amah },
				{ hidden: false, name: 'ריס', value: unitValues.ris },
				{ hidden: false, name: 'מיל', value: unitValues.mil },
				{ hidden: false, name: 'פרסה', value: unitValues.parsa },
			]
		},
	},
})
</script>

<template>
	<SelectRabi
		:default-ruler="ruler"
		@ruler-change="newRuler => ruler = newRuler"
	/>

	<h6>שים לב: הסיט מחושב לפי שיטת הרמב"ם</h6>
	<LengthTable :units="units.filter(unit => !unit.hidden)" />

	<CalculatorComponent :units="units" />
</template>
