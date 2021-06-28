import User from '../../../models/User.model';
import Design from '../../../models/Design.model';

import dbConnect from './../../../utils/dbConnect';

export default async function handler(req, res) {
	const { id } = req.body;

	await dbConnect();

	const user = await User.findById(id).populate('designs');

	res.status(200).json(user);
}
