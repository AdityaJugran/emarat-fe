module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				emarat: {
					primary: {
						default: '#DDDDDD',
					},
					secondary: {
						default: '#125D98',
					},
					tertiary: {
						default: '#3C8DAD',
					},
					accent: {
						default: '#F5A962',
						hover: '#F59943',
						active: '#F38E30',
					},
				},
				brands: {
					facebook: '#1877F2',
					instagram: '#DC2743',
					twitter: '#1C9CEA',
					linkedin: '#0A66C2',
				},
			},
			boxShadow: {
				around: '0px 2px 10px rgba(0, 0, 0, 0.25)',
			},
			borderRadius: {
				'5xl': '3rem',
			},
		},
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }
		},
	},
	variants: {
		extend: {
			backgroundColor: ['active'],
			textColor: ['active'],
		},
	},
	plugins: [],
};
