import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import dbConnect from '../../../utils/dbConnect';
import User from './../../../models/User.model';
import { verifyPassword } from './../../../utils/Bcrypt';

const options = {
	site: process.env.NEXTAUTH_URL,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60 // 30 days
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				await dbConnect();

				console.log(credentials.email);
				const user = await User.findOne({
					email: credentials.email
				});

				console.log('line 23', user);
				if (!user) {
					throw new Error('user not found!');
				}

				//Check input password validity
				const validPassword = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!validPassword) {
					throw new Error(
						"Can't log in, please check your email and password!"
					);
				}

				//NextAuth requires you to return an object if credentials are valid
				return {
					id: user._id,
					email: user.email,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					address: user.address,
					birthday: user.birthday,
					photo: user.photo
				};
			}
		})
	],
	callbacks: {
		jwt(token, profile) {
			if (profile) {
				return { ...token, user: profile };
			}
			return token;
		},
		session(session, token) {
			return token;
		}
	},
	database: process.env.DATABASE_URL
};

export default (req, res) => NextAuth(req, res, options);
