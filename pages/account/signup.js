import Layout from '@/components/layout/Layout';
import Input from '@/components/UI/Input';
import styles from '@/styles/components/Form.module.scss';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadFile from 'utils/fileupload';
import { createUser } from '@/services/Auth.service';
import { signupFormItems, signupFormStartingState } from 'utils/forms';

export default function SignupPage() {
	const router = useRouter();
	
	const [avatar, setAvatar] = useState('');
	const [formData, setFormData] = useState(signupFormStartingState);

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleFile = (e) => {
		setAvatar(e.target.files[0])
	}

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

	const signupFormElements = signupFormItems(formData, handleChange, handleFile)

	return (
		<Layout title='Create an account'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Sign up
				</h1>

				<ToastContainer position='top-left' />

				<form onSubmit={handleSubmit}>
					{signupFormElements.map((element) => (
						<Input key={element.id} {...element} />
					))}
					<button type='submit'>Sign up</button>
				</form>
			</div>
		</Layout>
	);
}
