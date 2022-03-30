<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Ruler, Unit } from '../types'
import PageGeneric from './PageGeneric.vue'
import { roundNum } from '../helpers'

class UnitValues {
	// Base unit is meter
	etzba: .024 | .02
	tefach: number
	sit: number
	zeret: number
	amah: number
	ris: number
	mil: number
	parsa: number

	constructor(ruler: Ruler) {
		// Base unit is meter
		this.etzba  = ruler === 'חזון_איש' ? .024 : .02
		this.tefach = roundNum(4 * this.etzba)
		this.sit    = roundNum(2 * this.tefach)
		this.amah   = roundNum(6 * this.tefach)
		this.zeret  = roundNum(.5 * this.amah)
		this.mil    = roundNum(2000 * this.amah)
		this.parsa  = roundNum(4 * this.mil)
		this.ris    = roundNum(2/15 * this.mil)
	}
}

export default defineComponent({
	components: {
		PageGeneric,
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
				input: 'טפח',
				output: 'סנטימטר',
			},
		}
	},

	computed: {
		units(): Unit[] {
			const unitValues = new UnitValues(this.ruler)
			return [
				{ hidden: true, name: 'סנטימטר', value: .01 },
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

	methods: {
		formatNum(num: number) {
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
	<PageGeneric
		:default-units="defaultUnits"
		:format-num="formatNum"
		:units="units"
		message="שים לב: הסיט מחושב לפי שיטת הרמב&quot;ם"
	/>
</template>
