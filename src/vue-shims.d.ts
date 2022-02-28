declare module '*.vue' {
	import Vue from 'vue'
	const component: ReturnType<Vue.DefineComponent>
	export default component
}
