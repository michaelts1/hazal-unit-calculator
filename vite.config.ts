import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		Vue(),
	],

	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			enabled: true,
			clean: false,
			include: [ 'src/**' ],
			all: true,
			100: true,
		},
	},
})
