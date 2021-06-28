import Layout from '@/components/layout/Layout';
import styles from '@/styles/components/Form.module.scss';
import { useState } from 'react';
import { createUser } from '@/services/Auth.service';
import { useRouter } from 'next/router';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadFile from 'utils/fileupload';

export default function SignupPage() {
	const router = useRouter();
	const [avatar, setAvatar] = useState('');
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		pwdValidation: '',
		firstName: '',
		lastName: '',
		birthdate: '',
		street: '',
		block: '',
		city: '',
		state: '',
		country: '',
		postcode: ''
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

		const { email, password, pwdValidation } = formData;

		if (emptyData) {
			toast.error('Please fill all fields');
		} else if (!email.includes('@')) {
			toast.info('Please enter a valid email!');
		} else if (password !== pwdValidation) {
			toast.info("Passwords don't match!");
		} else {
			const uploadedImgUrl = await uploadFile(avatar);
			console.log(uploadedImgUrl);

			const newUserData = {
				...formData,
				photo: uploadedImgUrl
			};

			toast.success('Creating the user');
			const newUser = await createUser(newUserData);
			if (newUser) router.push('/account/login');
		}
	};

	return (
		<Layout title='Create an account'>
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
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							placeholder='Your password'
							value={formData.password}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label htmlFor='pwdValidation'>Repeat your password</label>
						<input
							type='password'
							name='pwdValidation'
							placeholder='Repeat your password'
							value={formData.pwdValidation}
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
						<label htmlFor='age'>Date of birth</label>
						<input
							type='date'
							name='birthdate'
							value={formData.age}
							onChange={(e) => handleChange(e)}
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
					<button type='submit'>Sign up</button>
				</form>
			</div>
		</Layout>
	);
}
