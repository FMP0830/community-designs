import Link from 'next/link'
import Layout from '@/components/layout/Layout';
import Input from '@/components/UI/Input';
import styles from '@/styles/pages/UploadDesign.module.scss';

import { getSession } from 'next-auth/client';
import { getUserData } from '@/services/User.service';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadFile from 'utils/fileupload';
import { uploadDesignStartingState, uploadDesignItems } from 'utils/forms';
import { createDesign } from '@/services/Design.service';

import PropTypes from 'prop-types';

function UploadsPage(props) {
	const router = useRouter();

	const [image, setImage] = useState('');
	const [formData, setFormData] = useState(uploadDesignStartingState);

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleFile = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { title, description, price } = formData;

		if (!title || !description || !image) {
			toast.error('Please fill all fields');
		} else if (title.trim().length === 0 || description.trim().length === 0) {
			toast.info('Please provide valid data');
		} else if (price < 0) {
			toast.error('Please provide a valid price');
		} else {
			const uploadedImgUrl = await uploadFile(image);
			console.log(uploadedImgUrl);

			const newDesignData = {
				...formData,
				image: uploadedImgUrl
			};

			toast.success('Creating the design');

			const newDesign = await createDesign(newDesignData);
			if (newDesign) router.push('/account/profile');
		}
	};

	const uploadDesignElements = uploadDesignItems(
		formData,
		handleChange,
		image,
		handleFile
	);

	return (
		<Layout title='Upload a new design'>
			<div className={styles.upload}>
				<h1>
					<FaCloudUploadAlt /> Create a new design
				</h1>

				<ToastContainer position='top-left' />
				<form className={styles.form} onSubmit={handleSubmit}>
					{uploadDesignElements.map((element) => (
						<Input key={element.id} {...element} />
					))}
					<Link href='/account/profile'>
						<a>Back</a>
					</Link>
					<button type='submit'>Create design</button>
				</form>
			</div>
		</Layout>
	);
}

UploadsPage.propTypes = {};

export default UploadsPage;

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
