import Design from '../../../models/Design.model';

import dbConnect from './../../../utils/dbConnect';

export default async function handler(req, res) {
	await dbConnect();

	const allDesigns = await Design.find({
		$and: [{ totalVotes: { $lt: 10 } }, { valuation: { $lt: 5 } }]
	}).populate('author');

	res.status(200).json(allDesigns);
}
