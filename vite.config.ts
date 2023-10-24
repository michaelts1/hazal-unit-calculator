import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [ vue() ],
	root: './',
	server: { open: true },

	build: {
		assetsDir: './',
		outDir: 'dist',
		sourcemap: true,
		target: [
			'chrome100',
			'es2021',
			'firefox100',
		],
	},

	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			all: true,
			clean: false, // VSCode locks files, causing EPERM errors on deletion
			enabled: true,
			exclude: [ 'src/index.ts', '**/**.d.ts' ],
			include: [ 'src/**' ],
			skipFull: true,
		},
	},
})
