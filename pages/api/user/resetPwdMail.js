import User from '../../../models/User.model';
import dbConnect from './../../../utils/dbConnect';

import { transporter, resetPwdMail } from '@/utils/nodemailer';

export default async function handler(req, res) {
	//Get user id from body
	const { email } = req.body;

	await dbConnect();

	const user = await User.findOne({ email });

	const pwdMail = resetPwdMail(user);

	await transporter.sendMail(pwdMail, (err, info) => {
		if (err) console.log(err);
		else console.log(info);
	});

	res.status(201).json({ success: true, user: user });
}
