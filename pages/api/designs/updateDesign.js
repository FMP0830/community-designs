import Design from '../../../models/Design.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (session) {
		const { id, title, description, price, image } = req.body;

		console.log(id, title, description, price, image);

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
