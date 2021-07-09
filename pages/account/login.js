import Layout from '@/components/layout/Layout';
import Input from '@/components/UI/Input';
import styles from '@/styles/components/Form.module.scss';

import { useState } from 'react';
import { signIn } from 'next-auth/client';

import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { loginFormItems, loginFormStartingState } from 'utils/forms';

export default function LoginPage() {
	const router = useRouter();

	const [formData, setFormData] = useState(loginFormStartingState);

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
			toast.info('Logging in');
			const signin = await signIn('credentials', {
				redirect: false,
				email: email,
				password: password
			});

			console.log(signin);

			if (signin.error) {
				toast.error(signin.error);
			} else {
				toast.success(`Welcome, ${email}`);
				router.replace('/account/profile');
			}
		}
	};

	const loginFormElements = loginFormItems(formData, handleChange);

	return (
		<Layout title='Log in'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Log in
				</h1>

				<ToastContainer position='top-left' />
				<form onSubmit={handleSubmit}>
					{loginFormElements.map((element) => (
						<Input key={element.id} {...element} />
					))}
					<button type='submit'>Log in</button>
				</form>
			</div>
		</Layout>
	);
}
