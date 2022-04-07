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
				input: 'zait',
				output: 'cc',
			},
		}
	},

	computed: {
		units(): Unit[] {
			// Base unit is liter
			const beitza   = this.ruler === 'chazonIsh' ? .09953 : .0576
			const grogeret = roundNum(1/3 * beitza)
			const zait     = roundNum(0.5 * beitza)
			const peras    = roundNum(3 * beitza)
			const log      = roundNum(6 * beitza)
			const kortov   = roundNum(1/64 * log)
			const litra    = roundNum(0.5 * log)
			const kav      = roundNum(24 * beitza)
			const seah     = roundNum(6 * kav)
			const eifa     = roundNum(3 * seah)
			const kur      = roundNum(10 * eifa)

			return [
				{ hidden: true, id: 'cc', name: i18n.t('cubicCentimeterShort'), value: 0.001 },
				{ hidden: true, id: 'liter', name: i18n.t('literLong'), value: 1 },
				{ hidden: true, id: 'cbm', name: i18n.t('cubicMeterShort'), value: 1000 },
				{ hidden: false, id: 'kortov', name: i18n.t('kortov'), value: kortov },
				{ hidden: false, id: 'grogeret', name: i18n.t('grogeret'), value: grogeret },
				{ hidden: false, id: 'zait', name: i18n.t('zait'), value: zait },
				{ hidden: false, id: 'beitza', name: i18n.t('beitza'), value: beitza },
				{ hidden: false, id: 'peras', name: i18n.t('peras'), value: peras },
				{ hidden: false, id: 'litra', name: i18n.t('litra'), value: litra },
				{ hidden: false, id: 'log', name: i18n.t('log'), value: log },
				{ hidden: false, id: 'kav', name: i18n.t('kav'), value: kav },
				{ hidden: false, id: 'seah', name: i18n.t('seah'), value: seah },
				{ hidden: false, id: 'eifa', name: i18n.t('eifa'), value: eifa },
				{ hidden: false, id: 'kur', name: i18n.t('kor'), value: kur },
			]
		},
	},

	methods: {
		formatNum(num: number) {
			let unit = i18n.t('literLong')

			if (num < 1) {
				num *= 1000
				unit = i18n.t('cubicCentimeterShort')
			} else if (num > 1000) {
				num /= 1000
				unit = i18n.t('cubicMeterShort')
			}

			return roundNum(num, 2) + ' ' + unit
		},
	},
})
</script>

<template>
	<PageGeneric
		:default-units="defaultUnits"
		:format-num="formatNum"
		:units="units"
		:message="i18n.t('messageVolume')"
	/>
</template>
