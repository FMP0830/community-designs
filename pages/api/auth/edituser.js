import User from './../../../models/User.model';
import dbConnect from './../../../utils/dbConnect';

async function handler(req, res) {
	//validate http verb
	if (req.method !== 'PUT') {
		res.status(403).json({ message: 'Bad request' });
		return;
	}

	//validate data sent through body
	let emptyData;

	for (let entry in req.body) {
		if (!req.body[entry] || req.body[entry].trim().length === 0) {
			emptyData = true;
		}
	}

	if (emptyData || !req.body.email.includes('@')) {
		res.status(403).json({ message: 'invalid data' });
		return;
	}

	//construct object for updated data
	const userData = { ...req.body };
	delete userData.id;

	if (req.body.photo) userData.photo = req.body.photo;
	if (req.body.birthdate) userData.birthdate = req.body.birthdate;

	const address = {
		street: req.body.street,
		block: req.body.block,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		postcode: req.body.postcode
	};

	userData.address = address;

	console.log(req.body.id, userData);

	await dbConnect();

	const updatedUser = await User.findByIdAndUpdate(req.body.id, userData);

	if (updatedUser) res.status(201).json({ success: true, user: updatedUser });
	if (!updatedUser) res.status(400).json({ success: false });
}

export default handler;
