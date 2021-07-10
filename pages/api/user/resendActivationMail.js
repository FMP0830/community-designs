import User from '../../../models/User.model';
import dbConnect from './../../../utils/dbConnect';

import { transporter, welcomeMail } from '@/utils/nodemailer';

export default async function handler(req, res) {
	
  //Get user id from body
	const { id } = req.body;

	await dbConnect();

	const user = await User.findById(id);

	const helloMail = welcomeMail(user);

	await transporter.sendMail(helloMail, (err, info) => {
		if (err) console.log(err);
		else console.log(info);
	});

	res.status(201).json({ success: true, user: user });
}
