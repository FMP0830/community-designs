import Layout from '@/components/layout/Layout';
import styles from '@/styles/components/Form.module.scss';

import Input from '@/components/UI/Input';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { resetPwdStartingState, resetPassword } from 'utils/forms';
import { resetYourPassword } from '@/services/User.service';

export default function ResetPasswordPage() {
	const router = useRouter();
	const { id } = router.query;

	const [formData, setFormData] = useState(resetPwdStartingState);

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
		console.log(id[0], formData);

		if (formData.password.length < 5) {
			toast.info('Your password must be longer than 5 characters');
		} else if (formData.password !== formData.pwdValidation) {
			toast.error("Passwords don't match!");
		} else {
			toast.info('Check your inbox!');
			resetYourPassword(id[0], formData.password);
		}
	};

	const resetFormElements = resetPassword(formData, handleChange);

	return (
		<Layout title='Reset your password'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Reset your password
				</h1>

				<ToastContainer position='bottom-right' />
				<form onSubmit={handleSubmit}>
					{resetFormElements.map((element) => (
						<Input key={element.id} {...element} />
					))}
					<button type='submit'>Reset your password</button>
				</form>
			</div>
		</Layout>
	);
}
