import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export async function createDesign(body) {
	console.log(body);

	const data = await fetch(`${API_URL}/designs/createDesign`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return await data.json();
}

export async function updateDesign(body) {
	console.log(body);

	const data = await fetch(`${API_URL}/designs/updateDesign`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return await data.json();
}

export async function getDesignData(id) {
	const res = await fetch(`${API_URL}/designs/getDesign`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}

export async function getAllDesigns() {
	const res = await fetch(`${API_URL}/designs/getAllDesigns`);

	return res.json();
}

export async function getDesignsToVote() {
	const res = await fetch(`${API_URL}/designs/getDesignsToVote`);

	return res.json();
}

export async function getDesignsToBuy() {
	const res = await fetch(`${API_URL}/designs/getDesignsToVote`);

	return res.json();
}

export async function deleteDesign(id) {
	const res = await fetch(`${API_URL}/designs/deleteDesign`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}

export async function voteDesign(body) {
	console.log(body);

	const data = await fetch(`${API_URL}/designs/voteDesign`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return await data.json();
}
