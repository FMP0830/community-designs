import User from './../../../models/User.model';
import dbConnect from './../../../utils/dbConnect';
import { hashPassword } from './../../../utils/Bcrypt';

async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(403).json({ message: 'Bad request' });
		return;
	}

	let emptyData;

	for (let entry in req.body) {
		if (!req.body[entry] || req.body[entry].trim().length === 0) {
			emptyData = true;
		}
	}

	if (
		emptyData ||
		!req.body.email.includes('@') ||
		req.body.password !== req.body.pwdValidation ||
		req.body.password.length < 5
	) {
		res.status(403).json({ message: 'invalid data' });
		return;
	}

	const {
		username,
		email,
		password,
		firstName,
		lastName,
		birthdate,
		street,
		block,
		city,
		state,
		country,
		postcode,
		photo
	} = req.body;

	const address = {
		street,
		block,
		city,
		state,
		country,
		postcode
	};

	const encryptedPassword = await hashPassword(password);

	await dbConnect();

	const existingUser = await User.findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: 'user already exists!' });
		return;
	}

	const newUser = await User.create({
		username,
		email,
		password: encryptedPassword,
		firstName,
		lastName,
		birthdate,
		photo,
		address
	});

	if (newUser) res.status(201).json({ success: true, user: newUser });
	if (!newUser) res.status(400).json({ success: false });
}

export default handler;
