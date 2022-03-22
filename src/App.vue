<script lang="ts">
import { defineComponent } from 'vue'
import LengthPage from './components/LengthPage.vue'

export default defineComponent({
	components: {
		LengthPage,
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
		<LengthPage v-if="page === 'Length'" />
	</article>

	<footer>© כל הזכויות שמורות למיכאל צבאן</footer>
</template>
