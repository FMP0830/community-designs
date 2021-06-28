export async function createUser(body) {
	console.log(body);

	const data = await fetch('http://localhost:3000/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return await data.json();
}

export async function updateUser(body) {
	console.log(body)

	const data = await fetch('http://localhost:3000/api/auth/edituser', {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	})

	return await data.json()
}
