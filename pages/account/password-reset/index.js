import Layout from '@/components/layout/Layout';
import styles from '@/styles/components/Form.module.scss';

import Input from '@/components/UI/Input';

import { useState } from 'react';

import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPasswordStartingState, updateResetPassword } from 'utils/forms';
import { sendResetPwdMail } from '@/services/User.service';

export default function ResetPasswordPage() {
	const [formData, setFormData] = useState(resetPasswordStartingState);

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
		toast.info('Check your inbox!');
		sendResetPwdMail(formData);
	};

	const resetFormElements = updateResetPassword(formData, handleChange);

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
					<button type='submit'>Send link</button>
				</form>
			</div>
		</Layout>
	);
}
