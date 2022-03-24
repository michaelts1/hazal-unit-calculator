<script lang="ts">
import { defineComponent } from 'vue'
import PageLength from './components/PageLength.vue'

export default defineComponent({
	components: {
		PageLength,
	},

	data() {
		return {
			page: 'Length',
		}
	},
})
</script>

<template>
	<header>
		<h1>מחשבון יחידות תלמודיות</h1>
	</header>

	<article>
		<PageLength v-if="page === 'Length'" />
	</article>

	<footer>© כל הזכויות שמורות למיכאל צבאן</footer>
</template>
