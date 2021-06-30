import Layout from '@/components/layout/Layout';
import Input from '@/components/UI/Input';
import styles from '@/styles/components/Form.module.scss';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

import uploadFile from 'utils/fileupload';
import { updateUser } from '@/services/Auth.service';
import { getUserData } from '@/services/User.service';
import {
	editProfileStartingState,
	editProfileItems,
	editProfileHiddenItems
} from 'utils/forms';

import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage({ user }) {
	const router = useRouter();

	const [hiddenFields, setHiddenFields] = useState(false);

	const initialForm = editProfileStartingState(user);
	const [formData, setFormData] = useState(initialForm);
	const [birthdate, setBirthdate] = useState('');
	const [avatar, setAvatar] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleBirthday = (e) => {
		setBirthdate(e.target.value);
	};

	const handleFile = (e) => {
		setAvatar(e.target.files[0]);
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

	const editProfileElements = editProfileItems(formData, handleChange);
	const editProfileHiddenElements = editProfileHiddenItems(
		birthdate,
		avatar,
		handleBirthday,
		handleFile
	);

	return (
		<Layout title='Edit your profile'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Sign up
				</h1>

				<ToastContainer position='top-left' />

				<form onSubmit={handleSubmit}>
					{editProfileElements.map((element) => (
						<Input key={element.id} {...element} />
					))}

					<span>
						<span type='none' onClick={() => setHiddenFields(!hiddenFields)}>
							Edit profile picture?
						</span>
					</span>

					{hiddenFields &&
						editProfileHiddenElements.map((element) => (
							<Input key={element.id} {...element} />
						))}
						
					<Link href='/account/profile'>
						<a>Back</a>
					</Link>
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
