import Layout from '@/components/layout/Layout';
import styles from '@/styles/components/Form.module.scss';
import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function LoginPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: '',
		password: ''
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

		console.log(formData);

		const { email, password } = formData;

		if (!email || !password) {
			toast.error('Please fill all fields');
		} else if (password.length < 3) {
			toast.error('Password is not correct!');
		} else {
			toast.success('Logging in');
			const signin = await signIn('credentials', {
				redirect: false,
				email: email,
				password: password
			});

			console.log(signin);

			if (!signin.error) {
				router.replace('/account/profile');
			}
		}
	};

	return (
		<Layout title='Log in'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Log in
				</h1>

				<ToastContainer position='top-left' />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email'>e-mail</label>
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
					<button type='submit'>Log in</button>
				</form>
			</div>
		</Layout>
	);
}
