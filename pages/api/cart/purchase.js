import User from './../../../models/User.model';
import Design from './../../../models/Design.model';
import Purchase from './../../../models/Purchase.model';

import dbConnect from './../../../utils/dbConnect';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(403).json({ message: 'Bad request' });
		return;
	}

	await dbConnect();

	//Create the purchase

	//Update the buyer 

	//Update Designs with updated purchase numbers

	//Update ComPoints for sellers

	console.log('req.body', req.body);
}
