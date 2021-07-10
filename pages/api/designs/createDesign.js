import User from '../../../models/User.model';
import Design from '../../../models/Design.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {

	//Check if user is logged in through sessoin
	const session = await getSession({ req });
	if (session) {

		//Get information from session and body
		const userId = session.user.id;
		const { title, description, price, image } = req.body;

		await dbConnect();

		//Create the new Design
		const newDesign = await Design.create({
			author: userId,
			title,
			description,
			price,
			image
		});

		//Push the new design ref into the author
		const updatedUser = await User.findByIdAndUpdate(userId, {
			$push: { designs: newDesign._id }
		});

		res.status(201).json(newDesign, updatedUser);

	} else {

		res.status(401).json({ message: 'unauthorized' });

	}
}
