/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		extend: {
			fill: (theme) => ({
				red: theme("colors.red.primary"),
			}),
			colors: {
				blue: {
					medium: "#005c98",
				},
				gray: {
					base: "#616161",
					background: "#fafafa",
					primary: "#dbdbdb",
				},
				red: {
					primary: "#ed4956",
				},
				black: {
					light: "#262626",
					faded: "#00000059",
				},
			},
		},
	},
	plugins: [],
};
