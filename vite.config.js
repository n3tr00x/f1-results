import autoprefixer from 'autoprefixer';

export default {
	root: './src',
	publicDir: '../public',
	build: {
		outDir: '../dist',
	},
	server: {
		port: 3000,
		open: true,
	},
	css: {
		postcss: {
			plugins: [autoprefixer()],
		},
	},
};
