import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export async function createUser(body) {
	console.log(body);

	const data = await fetch(`${API_URL}/auth/signup`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	if (!data) console.log('something went wrong');

	return await data.json();
}

export async function updateUser(body) {
	console.log(body);

	const data = await fetch(`${API_URL}/auth/edituser`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return await data.json();
}
