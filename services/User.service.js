import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export async function getUserData(id) {
	const res = await fetch(`${API_URL}/user/getuserdata`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}
