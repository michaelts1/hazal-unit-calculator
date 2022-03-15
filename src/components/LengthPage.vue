<script lang="ts">
import { Ruler, Unit } from '../types'
import { defineComponent } from 'vue'
import LengthTable from './LengthTable.vue'
import SelectRabi from './SelectRabi.vue'
import { UnitValues } from '../helpers'

export default defineComponent({
	components: {
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
	<LengthTable :units="units" />
</template>
