const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [
		plugin(({ addVariant }) => {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('hocus-visible', ['&:hover', '&:focus-visible']);
			addVariant('group-hocus', ['.group:hover &', '.group:focus &']);
			addVariant('group-hocus-visible', [
				'.group:hover &',
				'.group:focus-visible &'
			]);
		})
	]
};

module.exports = config;
