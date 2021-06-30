import Design from '../../../models/Design.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (session) {
		const userId = session.user.id;

		const { value, designId } = req.body;

		console.log(userId, value, designId);

		await dbConnect();

		const updatedDesign = await Design.findByIdAndUpdate(
			designId,
			{
				$inc: { totalVotes: 1, valuation: value }
			},
			{ new: true }
		);

		const updatedVote = await Design.findByIdAndUpdate(
			designId,
			{
				$push: { voted_by: userId }
			},
			{ new: true }
		);

		console.log(updatedVote);

		if (updatedVote) res.status(201).json(updatedVote);
	} else {
		res.status(401).json({ message: 'unauthorized' });
	}
}
