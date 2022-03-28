/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'cdn.igalaxy.dev',
			'steamcdn-a.akamaihd.net',
			'm.media-amazon.com',
			'cdn2.steamgriddb.com',
		],
	},
};

module.exports = nextConfig;
