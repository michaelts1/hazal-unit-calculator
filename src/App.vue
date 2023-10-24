<script lang="ts">
import { defineComponent } from 'vue'
import { MessageName, i18n } from './i18n'
import PageLength from './components/PageLength.vue'
import PageVolume from './components/PageVolume.vue'
import PageWeight from './components/PageWeight.vue'
import SelectPage from './components/SelectPage.vue'
import SelectRabi from './components/SelectRabi.vue'
import type { Ruler } from './types'

export default defineComponent({
	components: {
		PageLength,
		PageVolume,
		PageWeight,
		SelectPage,
		SelectRabi,
	},

	data() {
		return {
			i18n,
			page: 'length',
			ruler: 'grach' as Ruler,
			pages: ['length', 'volume', 'weight'] as MessageName[],
		}
	},

	computed: {
		otherLang() { return i18n.currentLocale === 'he' ? 'en' : 'he' },
	},

	methods: {
		changeLang() {
			i18n.changeLocale(this.otherLang)
		},
	},
})
</script>

<template>
	<div class="container">
		<header>
			<h1> {{ i18n.t('title') }} </h1>

			<div id="switch-lang-container">
				<button
					id="switch-lang"
					class="btn"
					type="button"
					@click="changeLang"
				>
					{{ i18n.t('_name', otherLang) }}
				</button>
			</div>
		</header>

		<div class="mx-auto">
			<SelectPage
				class="select"
				:default-page="page"
				:pages="pages"
				@page-change="newPage => page = newPage"
			/>
			<SelectRabi
				v-if="page !== 'weight'"
				class="select"
				:default-ruler="ruler"
				@ruler-change="newRuler => ruler = newRuler"
			/>
		</div>

		<article class="mx-auto">
			<PageLength
				v-if="page === 'length'"
				:ruler="ruler"
			/>
			<PageVolume
				v-else-if="page === 'volume'"
				:ruler="ruler"
			/>
			<PageWeight
				v-else-if="page === 'weight'"
			/>
		</article>
	</div>

	<div id="bottom">
		<footer> {{ i18n.t('copyright') }}</footer>
		<a
			class="github-ribbon"
			href="https://github.com/michaelts1/hazal-unit-calculator"
			data-ribbon="GitHub"
			title="GitHub"
			target="_blank"
		>GitHub</a>
	</div>
</template>
