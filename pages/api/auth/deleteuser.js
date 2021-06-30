import User from '../../../models/User.model';
import dbConnect from '../../../utils/dbConnect';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
	
  const session = await getSession({ req });
	
  if (session) {
		
		await Design.findByIdAndDelete(id);

		res.status(201).json(updatedUser);

	} else {

		res.status(401).json({ message: 'unauthorized' });
	
  }
}
