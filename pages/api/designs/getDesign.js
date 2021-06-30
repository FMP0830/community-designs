import Design from '../../../models/Design.model';

import dbConnect from './../../../utils/dbConnect';

export default async function handler(req, res) {
	const { id } = req.body;

	await dbConnect();

	const design = await Design.findById(id).populate('author');

	res.status(200).json(design);
}