import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export async function cartCheckout(body) {
	console.log(body);

	const data = await fetch(`${API_URL}/cart/checkout`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	if (!data) console.log('something went wrong');

	return await data.json();
}

export async function createPurchase(body) {
	console.log(body);

	const data = await fetch(`${API_URL}/cart/purchase`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	if (!data) console.log('something went wrong');

	return await data.json();
}