import Design from '../../../models/Design.model';
import User from '../../../models/User.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {

	//Check if user is logged in through session
	const session = await getSession({ req });
	if (session) {

		//Get voter id and design id
		const userId = session.user.id;
		const { value, designId } = req.body;

		await dbConnect();

		//Update the design to add votes
		const updatedDesign = await Design.findByIdAndUpdate(
			designId,
			{
				$inc: { totalVotes: 1, valuation: value }
			},
			{ new: true }
		);

		//Add voter ref to design
		const updatedVote = await Design.findByIdAndUpdate(
			designId,
			{
				$push: { voted_by: userId }
			},
			{ new: true }
		);

		//Update owner's ComPoints
		const designerId = updatedDesign.author
		const updatedDesigner = await User.findByIdAndUpdate(designerId, {
			$inc: { com_points: 10 }
		})

		if (updatedDesign && updatedVote && updatedDesigner) res.status(201).json(updatedVote);

	} else {

		res.status(401).json({ message: 'unauthorized' });

	}
}
