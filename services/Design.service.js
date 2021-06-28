export async function createDesign(body) {
	console.log(body);

	const data = await fetch('http://localhost:3000/api/designs/createDesign', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json'
		}
	});

	return await data.json();
}
