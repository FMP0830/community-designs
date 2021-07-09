import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { STRIPE_SK } = publicRuntimeConfig;

import Stripe from 'stripe';
const stripe = new Stripe(STRIPE_SK);

const validateCartItems =
	require('use-shopping-cart/src/serverUtil').validateCartItems;

async function handler(req, res) {
	console.log(STRIPE_SK);
	try {
		if (req.method !== 'POST') {
			res.status(403).json({ message: 'Bad request' });
			return;
		}

		const origin =
			process.env.NODE_ENV === 'production'
				? req.headers.origin
				: 'http://localhost:3000';

		const cartItems = [];

		for (let item in req.body) {
			let currentItem = req.body[item];
			let itemObj = {
				price_data: {
					currency: 'eur',
					product_data: {
						name: currentItem.title,
						images: [currentItem.image]
					},
					unit_amount: currentItem.price * 100
				},
				quantity: currentItem.quantity
			};

			cartItems.push(itemObj);
		}

		console.log(cartItems);

		const params = {
			submit_type: 'pay',
			payment_method_types: ['card'],
			billing_address_collection: 'auto',
			line_items: cartItems,
			success_url: `${origin}/account/cart`,
			cancel_url: `${origin}/account/cart`,
			mode: 'payment'
		};

		console.log(params);

		const checkoutSession = await stripe.checkout.sessions.create(params);

		res.status(200).json(checkoutSession);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export default handler;
