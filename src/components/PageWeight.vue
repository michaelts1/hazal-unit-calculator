<script lang="ts">
import { defineComponent } from 'vue'
import { i18n } from '../i18n'
import { roundNum } from '../helpers'
import PageGeneric from './PageGeneric.vue'
import type { Unit } from '../types'

export default defineComponent({
	components: {
		PageGeneric,
	},
	data() {
		return {
			defaultUnits: {
				input: 'zuz',
				output: 'gram',
			},
		}
	},

	computed: {
		units(): Unit[] {
			// Base unit is gram
			const pruta   = .025
			const eisar   = roundNum(8 * pruta)
			const pundion = roundNum(2 * eisar)
			const maeh    = roundNum(2 * pundion)
			const zuz     = roundNum(6 * maeh)
			const shekel  = roundNum(2 * zuz)
			const sela  = roundNum(2 * shekel)
			const darcon  = roundNum(2 * shekel)
			const mane    = roundNum(12.5 * darcon)
			const kikar   = roundNum(3000 * shekel)

			return [
				{ hidden: true, id: 'mg', name: i18n.t('milligramLong'), value: 0.001 },
				{ hidden: true, id: 'gram', name: i18n.t('gramLong'), value: 1 },
				{ hidden: true, id: 'kg', name: i18n.t('kilogramLong'), value: 1000 },
				{ hidden: false, id: 'pruta', name: i18n.t('pruta'), value: pruta },
				{ hidden: false, id: 'eisar', name: i18n.t('eisar'), value: eisar },
				{ hidden: false, id: 'pundion', name: i18n.t('pundion'), value: pundion },
				{ hidden: false, id: 'maeh', name: i18n.t('maeh'), value: maeh },
				{ hidden: false, id: 'zuz', name: i18n.t('zuz'), value: zuz },
				{ hidden: false, id: 'shekel', name: i18n.t('shekel'), value: shekel },
				{ hidden: false, id: 'sela', name: i18n.t('sela'), value: sela },
				{ hidden: false, id: 'darcon', name: i18n.t('darcon'), value: darcon },
				{ hidden: false, id: 'mane', name: i18n.t('mane'), value: mane },
				{ hidden: false, id: 'kikar', name: i18n.t('kikar'), value: kikar },
			]
		},
	},

	methods: {
		formatNum(num: number) {
			let unit = i18n.t('gramLong')

			if (num < .1) {
				num *= 1000
				unit = i18n.t('milligramShort')
			} else if (num > 1000) {
				num /= 1000
				unit = i18n.t('kilogramShort')
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
	/>
</template>
