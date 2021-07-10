import User from '../../../models/User.model';
import dbConnect from './../../../utils/dbConnect';

export default async function handler(req, res) {
	//Get user id from body
	const { id } = req.body;

	await dbConnect();

	const user = await User.findById(id)

  if(user.active === true) {
    res.status(404).json({ error: 'This account is already active'});
  } else {
    const activatedUser = await User.findByIdAndUpdate(id, {
      active: true
    })
    res.status(404).json({ user: activatedUser, message: 'This account is already active' });
  }

}
