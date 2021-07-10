import User from '../../../models/User.model';
import Design from '../../../models/Design.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {

	//Check if user is logged in through sessoin
	const session = await getSession({ req });
	if (session) {
	
		//Get design id from body
		const { id } = req.body;

		await dbConnect();

		//Remove design from user
		const updatedUser = await User.findByIdAndUpdate(session.user.id, {
			$pull: { designs: id }
		});

		//Delete design
		await Design.findByIdAndDelete(id);

		res.status(201).json(updatedUser);
	
	} else {
	
		res.status(401).json({ message: 'unauthorized' });
	
	}
}
