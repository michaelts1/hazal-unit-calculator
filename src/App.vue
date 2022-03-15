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
	<h1>מחשבון יחידות תלמודיות</h1>
	<LengthPage v-if="page === 'Length'" />

	<footer>© כל הזכויות שמורות למיכאל צבאן</footer>
</template>
