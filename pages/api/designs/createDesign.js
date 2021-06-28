import User from '../../../models/User.model';
import Design from '../../../models/Design.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (session) {
		const userId = session.user.id;

		const { title, description, price, image } = req.body;

		console.log(userId, title, description, price, image);

		await dbConnect();

		const newDesign = await Design.create({
			author: userId,
			title,
			description,
			price,
			image
		});

		const updatedUser = await User.findByIdAndUpdate(userId, {
			$push: { designs: newDesign._id }
		});

		res.status(201).json(newDesign, updatedUser);
	} else {
		res.status(401).json({ message: 'unauthorized' });
	}
}
