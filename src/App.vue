<!-- Not using TypeScript due to a bug. See https://stackoverflow.com/questions/70051535 -->
<script lang="js">
import ConversionUI from './components/ConversionUI.vue'

export default {
	components: {
		ConversionUI,
	},
}
</script>

<template>
	<h1>מחשבון יחידות תלמודיות</h1>
	<ConversionUI />

	<footer>© כל הזכויות שמורות למיכאל צבאן</footer>
</template>
