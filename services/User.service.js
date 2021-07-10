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

export async function activateUser(id) {
	const res = await fetch(`${API_URL}/user/activateUser`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}

export async function resendActivationMail(id) {
	const res = await fetch(`${API_URL}/user/resendActivationMail`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}

export async function sendResetPwdMail(email) {
	const res = await fetch(`${API_URL}/user/resetPwdMail`, {
		method: 'POST',
		body: JSON.stringify(email),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}

export async function resetYourPassword(id, password) {
	const res = await fetch(`${API_URL}/user/resetPassword`, {
		method: 'POST',
		body: JSON.stringify({ id, password }),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}
