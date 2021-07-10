import User from './../../../models/User.model';
import Design from './../../../models/Design.model';
import Purchase from './../../../models/Purchase.model';

import dbConnect from './../../../utils/dbConnect';

export default async function handler(req, res) {
	try {
		//Check http request method
		if (req.method !== 'POST') {
			res.status(403).json({ message: 'Bad request' });
			return;
		}

		await dbConnect();

		//Create the purchase
		const newPurchase = Purchase.create(req.body);

		//Update the buyer
		const updatedBuyer = User.findByIdAndUpdate(
			req.body.userPurchasing,
			{
				$addToSet: { orders: newPurchase._id }
			},
			{ new: true }
		);

		//Update Designs with updated purchase numbers
		req.body.items_id.forEach(async (designId, index) => {
			const quantity = req.body.items_detail[index].quantity;

			await Design.findByIdAndUpdate(
				designId,
				{
					$inc: { timesSold: quantity }
				},
				{ new: true }
			);
		});

		//Update ComPoints for sellers
		req.body.userSelling.forEach(async (userId) => {
			const quantity = req.body.items_detail
				.filter((item) => item.author.id === userId)
				.map((item) => item.quantity)
				.reduce((acc, val) => acc + val, 0);

			console.log(quantity);

			await User.findByIdAndUpdate(
				userId,
				{
					$inc: { com_points: 100 * quantity }
				},
				{ new: true }
			);
		});

		if (newPurchase) res.status(201).json(newPurchase);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
