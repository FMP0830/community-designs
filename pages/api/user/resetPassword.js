import User from '../../../models/User.model';
import dbConnect from './../../../utils/dbConnect';
import { hashPassword } from './../../../utils/Bcrypt';

import { transporter, newPwdMail } from '@/utils/nodemailer';

export default async function handler(req, res) {
	console.log(req.body);
	const { id, password } = req.body;

	//Check data format
	if (password.length < 5) {
		res.status(403).json({ message: 'invalid data' });
		return;
	}

	//Encrypt password
	const encryptedPassword = await hashPassword(password);

	await dbConnect();

	const updatedUser = await User.findByIdAndUpdate(id, {
		password: encryptedPassword
	});

	if (updatedUser) {
		const resetMail = newPwdMail(updatedUser);

		await transporter.sendMail(resetMail, (err, info) => {
			if (err) console.log(err);
			else console.log(info);
		});

		res.status(201).json({ success: true, user: updatedUser });
	}
	if (!newUser) res.status(400).json({ success: false });
}
