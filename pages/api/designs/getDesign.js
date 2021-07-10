import Design from '../../../models/Design.model';
import User from '../../../models/User.model';

import dbConnect from './../../../utils/dbConnect';

export default async function handler(req, res) {

	//Get design id from body
	const { id } = req.body;

	await dbConnect();

	const design = await Design.findById(id).populate('author');

	res.status(200).json(design);
}
