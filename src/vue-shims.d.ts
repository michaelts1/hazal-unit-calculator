declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line init-declarations
	const component: DefineComponent
	export default component
}
