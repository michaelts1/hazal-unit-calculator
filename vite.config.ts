import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
	],
	root: './',
	server: { open: true },

	build: {
		target: [
			'es2020',
			'firefox80',
			'chrome80',
		],
		outDir: 'dist',
		assetsDir: './',
		sourcemap: 'inline',
	},

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
