/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		extend: {
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
			},
		},
	},
	plugins: [],
};
