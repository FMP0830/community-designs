import User from './../../../models/User.model';
import dbConnect from './../../../utils/dbConnect';

async function handler(req, res) {
	
	//Validate http request method
	if (req.method !== 'PUT') {
		res.status(403).json({ message: 'Bad request' });
		return;
	}

	//Validate data sent through body
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

	//Construct object for updated data
	const userData = { ...req.body };
	delete userData.id;

	//Check if there is new image or birthdate
	if (req.body.photo) userData.photo = req.body.photo;
	if (req.body.birthdate) userData.birthdate = req.body.birthdate;

	//Construct address object
	const address = {
		street: req.body.street,
		block: req.body.block,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		postcode: req.body.postcode
	};

	userData.address = address;

	await dbConnect();

	//Update the User information
	const updatedUser = await User.findByIdAndUpdate(req.body.id, userData);

	if (updatedUser) res.status(201).json({ success: true, user: updatedUser });
	if (!updatedUser) res.status(400).json({ success: false });
}

export default handler;
