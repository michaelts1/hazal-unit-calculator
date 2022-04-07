<script lang="ts">
import type { Page, Ruler } from './types'
import { defineComponent } from 'vue'
import { i18n } from './i18n'
import PageLength from './components/PageLength.vue'
import PageVolume from './components/PageVolume.vue'
import SelectPage from './components/SelectPage.vue'
import SelectRabi from './components/SelectRabi.vue'

export default defineComponent({
	components: {
		PageLength,
		PageVolume,
		SelectPage,
		SelectRabi,
	},

	data() {
		return {
			i18n,
			page: 'length' as Page,
			ruler: 'grach' as Ruler,
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
			<button
				id="switch-lang"
				class="btn"
				type="button"
				@click="changeLang"
			>
				{{ i18n.t('_name', otherLang) }}
			</button>
		</header>

		<div class="mx-auto">
			<SelectPage
				class="select"
				:default-page="page"
				@page-change="newPage => page = newPage"
			/>
			<SelectRabi
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
