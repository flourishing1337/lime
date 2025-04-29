// frontend/svelte.config.js
import adapter from '@sveltejs/adapter-node';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// run the site with a small Node server instead of static files
		adapter: adapter({ out: 'build' }),

		// turn off automatic prerendering (avoids __data.json redirect loops)
		prerender: { entries: [] },

		// optional import aliases – keep or remove as you like
		alias: {
			$lib:        resolve('./src/lib'),
			$components: resolve('./src/components')
		}
	}
};

export default config;
