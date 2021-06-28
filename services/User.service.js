export async function getUserData(id) {
	const res = await fetch(`http://localhost:3000/api/user/getuserdata`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return res.json();
}
