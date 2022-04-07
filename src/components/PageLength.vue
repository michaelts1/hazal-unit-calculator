<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Ruler, Unit } from '../types'
import { i18n } from '../i18n'
import PageGeneric from './PageGeneric.vue'
import { roundNum } from '../helpers'

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
			i18n,
			defaultUnits: {
				input: 'tefach',
				output: 'cm',
			},
		}
	},

	computed: {
		units(): Unit[] {
			// Base unit is meter
			const etzba  = this.ruler === 'chazonIsh' ? .024 : .02
			const tefach = roundNum(4 * etzba)
			const sit    = roundNum(2 * tefach)
			const amah   = roundNum(6 * tefach)
			const zeret  = roundNum(.5 * amah)
			const mil    = roundNum(2000 * amah)
			const parsa  = roundNum(4 * mil)
			const ris    = roundNum(2/15 * mil)

			return [
				{ hidden: true, id: 'cm', name: i18n.t('centimeterLong'), value: .01 },
				{ hidden: true, id: 'm', name: i18n.t('meterLong'), value: 1 },
				{ hidden: true, id: 'km', name: i18n.t('kilometerLong'), value: 1000 },
				{ hidden: false, id: 'etzba', name: i18n.t('etzba'), value: etzba },
				{ hidden: false, id: 'tefach', name: i18n.t('tefach'), value: tefach },
				{ hidden: false, id: 'sit', name: i18n.t('sit'), value: sit },
				{ hidden: false, id: 'zeret', name: i18n.t('zeret'), value: zeret },
				{ hidden: false, id: 'amah', name: i18n.t('amah'), value: amah },
				{ hidden: false, id: 'ris', name: i18n.t('ris'), value: ris },
				{ hidden: false, id: 'mil', name: i18n.t('mil'), value: mil },
				{ hidden: false, id: 'parsa', name: i18n.t('parsa'), value: parsa },
			]
		},
	},

	methods: {
		formatNum(num: number) {
			let unit = i18n.t('meterLong')

			if (num < .01) {
				num *= 1000
				unit = i18n.t('millimeterShort')
			} else if (num < 1) {
				num *= 100
				unit = i18n.t('centimeterShort')
			} else if (num > 1000) {
				num /= 1000
				unit = i18n.t('kilometerShort')
			}

			return roundNum(num) + ' ' + unit
		},
	},
})
</script>

<template>
	<PageGeneric
		:default-units="defaultUnits"
		:format-num="formatNum"
		:units="units"
		:message="i18n.t('messageLength')"
	/>
</template>
