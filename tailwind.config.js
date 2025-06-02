/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{html,js,php}"],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
		},
		extend: {
			screens: {
				"2xl": "1320px",
			},
			fontFamily: {
				sans: ['"Bricolage Grotesque"', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: "#4770FF",
				dark: "#1A1F2C",
				"dark-2": "#0E1018",
				light: "#F0F2F5",
				muted: "#576076",
			},
			aspectRatio: {
				"6/4": "6 / 4",
			},

			animation: {
				"infinite-scroll": "scroll 10s linear infinite",
				"scrollY": "scrollY 55s linear infinite",
				'spin-slow': 'spin 15s linear infinite',
				'spin-very-slow': 'spin 90s linear infinite',
				'track-primary': 'track-primary var(--ticker-speed,18s) linear infinite',
				'track-secondary': 'track-secondary var(--ticker-speed,18s) linear infinite',
			},

			keyframes: { 
				scroll: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - 1.5rem))" },
				},
				scrollY: {
					"0%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(calc(-50% - 1.5rem))" },
					"50.01%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(calc(-50% - 1.5rem))" }
				},
				'track-primary': {
					"0%,5%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-100%)" },
				},
				'track-secondary': {
					"0%": { transform: "translateY(100%)" },
					"95%,100%": { transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [require("preline/plugin"), require("@tailwindcss/typography")],
};
