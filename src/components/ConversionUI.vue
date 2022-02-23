<script>
import ConversionUIUnitTable from './ConversionUIUnitTable.vue'
import RabiSelect from './RabiSelect.vue'

export default {
	components: {
		RabiSelect,
		ConversionUIUnitTable,
	},

	props: {
		/* eslint-disable-next-line */ // If this useless line is removed, Vetur breaks :shrug:
		uselessProp: undefined,
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
		tefach: self => 4    * self.etzba ,
		sit   : self => 2    * self.tefach,
		zeret : self => 0.5  * self.amah  ,
		amah  : self => 6    * self.tefach,
		ris   : self => 2/15 * self.mil   ,
		mil   : self => 2000 * self.amah  ,
		parsa : self => 4    * self.mil   ,
		units() {
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
}
</script>

<template>
	<RabiSelect
		:default-ruler="ruler"
		@ruler-change="newRuler => ruler = newRuler"
	/>

	<h6>שים לב: הסיט מחושב לפי שיטת הרמב"ם</h6>
	<ConversionUIUnitTable :units="units" />
</template>
