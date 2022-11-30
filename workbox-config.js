module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,png,json,js,svg}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};