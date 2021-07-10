module.exports = {
	images: {
		domains: ['res.cloudinary.com', 'i.pinimg.com']
	},
	publicRuntimeConfig: {
		CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
		CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
		URL: process.env.NEXT_PUBLIC_URL,
		API_URL: process.env.NEXT_PUBLIC_API_URL,
		STRIPE_PK: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY,
		STRIPE_SK: process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY,
		NODEMAILER_MAIL: process.env.NEXT_PUBLIC_MAIL_ACCOUNT,
		NODEMAILER_PASS: process.env.NEXT_PUBLIC_MAIL_PASS
	}
};
