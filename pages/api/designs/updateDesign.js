import Design from '../../../models/Design.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {

	//Check if user is logged in through session
	const session = await getSession({ req });
	if (session) {

		//Get information to update from body
		const { id, title, description, price, image } = req.body;

		//Construct the object to update designs if image y/n
		let updatedDesignData = {
			title,
			description,
			price
		};

		if (image) updatedDesignData.image = image;

		await dbConnect();

		const updatedDesign = await Design.findByIdAndUpdate(id, updatedDesignData);

		res.status(201).json(updatedDesign);

	} else {

		res.status(401).json({ message: 'unauthorized' });

	}
}
