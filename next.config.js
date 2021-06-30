module.exports = {
	images: {
		domains: ['res.cloudinary.com']
	},
	publicRuntimeConfig: {
		CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
		CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
		API_URL: process.env.NEXT_PUBLIC_API_URL
	}
};
