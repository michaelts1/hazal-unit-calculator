<script lang="ts">
import ConversionUIUnitTable from './ConversionUIUnitTable.vue'
import { defineComponent } from 'vue'
import RabiSelect from './RabiSelect.vue'
import type { Unit } from './types'

export default defineComponent({
	components: {
		RabiSelect,
		ConversionUIUnitTable,
	},

	props: {
		/* eslint-disable-next-line */ // If this useless prop is removed, Vetur breaks :shrug:
		_$uselessProp: String,
	},

	data() {
		return {
			ruler: 'גרח',
		}
	},

	computed: {
		etzba() { // Base unit is meter
			switch (this.ruler) {
				case 'חזון_איש':
					return 0.024
				case 'גרח':
				default:
					return 0.02
			}
		},
		tefach() { return 4    * this.etzba  },
		sit()    { return 2    * this.tefach },
		zeret()  { return 0.5  * this.amah   },
		amah()   { return 6    * this.tefach },
		ris()    { return 2/15 * this.mil    },
		mil()    { return 2000 * this.amah   },
		parsa()  { return 4    * this.mil    },
		units(): Unit[] {
			return [
				{ hidden: true, name: 'סנטימטר', value: 0.01 },
				{ hidden: true, name: 'מטר', value: 1 },
				{ hidden: true, name: 'קילומטר', value: 1000 },
				{ hidden: false, name: 'אצבע', value: this.etzba },
				{ hidden: false, name: 'טפח', value: this.tefach },
				{ hidden: false, name: 'סיט', value: this.sit },
				{ hidden: false, name: 'זרת', value: this.zeret },
				{ hidden: false, name: 'אמה', value: this.amah },
				{ hidden: false, name: 'ריס', value: this.ris },
				{ hidden: false, name: 'מיל', value: this.mil },
				{ hidden: false, name: 'פרסה', value: this.parsa },
			]
		},
	},
})
</script>

<template>
	<RabiSelect
		:default-ruler="ruler"
		@ruler-change="newRuler => ruler = newRuler"
	/>

	<h6>שים לב: הסיט מחושב לפי שיטת הרמב"ם</h6>
	<ConversionUIUnitTable :units="units" />
</template>
