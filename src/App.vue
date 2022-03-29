<script lang="ts">
import type { Page, Ruler } from './types'
import { defineComponent } from 'vue'
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
			page: 'length' as Page,
			ruler: 'גרח' as Ruler,
		}
	},
})
</script>

<template>
	<header>
		<h1>מחשבון יחידות תלמודיות</h1>
	</header>

	<div class="centered-fit">
		<SelectPage
			class="select-page"
			:default-page="page"
			@page-change="newPage => page = newPage"
		/>
		<SelectRabi
			class="select-page"
			:default-ruler="ruler"
			@ruler-change="newRuler => ruler = newRuler"
		/>
	</div>

	<article class="centered-fit">
		<PageLength
			v-if="page === 'length'"
			:ruler="ruler"
		/>
		<PageVolume
			v-else-if="page === 'volume'"
			:ruler="ruler"
		/>
	</article>

	<footer>© כל הזכויות שמורות למיכאל צבאן</footer>
</template>
