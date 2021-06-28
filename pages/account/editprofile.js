import Layout from '@/components/layout/Layout';
import styles from '@/styles/components/Form.module.scss';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

import uploadFile from 'utils/fileupload';
import { updateUser } from '@/services/Auth.service';
import { getUserData } from '@/services/User.service';

import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage({ user }) {
	const router = useRouter();

	const [hiddenFields, setHiddenFields] = useState(false);
	const [avatar, setAvatar] = useState('');
	const [birthdate, setBirthdate] = useState('');

	const [formData, setFormData] = useState({
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		street: user.address.street,
		block: user.address.block,
		city: user.address.city,
		state: user.address.state,
		country: user.address.country,
		postcode: user.address.postcode
	});

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let emptyData;

		for (let entry in formData) {
			if (!formData[entry] || formData[entry].trim().length === 0) {
				emptyData = true;
			}
		}

		const { email } = formData;

		if (emptyData) {
			toast.error('Please fill all fields');
		} else if (!email.includes('@')) {
			toast.info('Please enter a valid email!');
		} else {
			const newUserData = { ...formData, id: user.id };

			if (avatar !== '') {
				const uploadedImgUrl = await uploadFile(avatar);
				formData.photo = uploadedImgUrl;
			}

			if (birthdate) formData.birthdate = birthdate;

			toast.success('Creating the user');
			const updatedUser = await updateUser(newUserData);
			if (updatedUser) router.push('/account/profile');
		}
	};

	return (
		<Layout title='Edit your profile'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Sign up
				</h1>

				<ToastContainer position='top-left' />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							placeholder='Your username'
							value={formData.username}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							placeholder='Your e-mail address is...'
							value={formData.email}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='firstName'>First name</label>
						<input
							type='text'
							name='firstName'
							placeholder='First name'
							value={formData.firstName}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='firstName'>Last name</label>
						<input
							type='text'
							name='lastName'
							placeholder='Last name'
							value={formData.lastName}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='street'>Street</label>
						<input
							type='text'
							name='street'
							placeholder='Street'
							value={formData.street}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='block'>Block</label>
						<input
							type='text'
							name='block'
							placeholder='Block'
							value={formData.block}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='city'>City</label>
						<input
							type='text'
							name='city'
							placeholder='City'
							value={formData.city}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='state'>State</label>
						<input
							type='text'
							name='state'
							placeholder='State'
							value={formData.state}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='country'>Country</label>
						<input
							type='text'
							name='country'
							placeholder='Country'
							value={formData.country}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='postcode'>Postcode</label>
						<input
							type='text'
							name='postcode'
							placeholder='Postcode'
							value={formData.postcode}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<span>
						<span type='none' onClick={() => setHiddenFields(!hiddenFields)}>
							Edit profile picture?
						</span>
					</span>
					{hiddenFields && (
						<>
							<div>
								<label htmlFor='age'>Date of birth</label>
								<input
									type='date'
									name='birthdate'
									value={formData.birthday}
									onChange={(e) => setBirthdate(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='image'>Profile pic</label>
								<input
									type='file'
									name='image'
									onChange={(e) => setAvatar(e.target.files[0])}
								/>
							</div>
						</>
					)}
					<button type='submit'>Update info</button>
				</form>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	if (!session) {
		ctx.res.writeHead(302, { Location: '/' });
		ctx.res.end();
		return {};
	} else {
		const data = await getUserData(session.user.id);
		console.log(data);

		return {
			props: {
				user: data
			}
		};
	}
}
