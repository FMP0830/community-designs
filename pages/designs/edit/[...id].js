import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Input from '@/components/UI/Input';
import styles from '@/styles/pages/UploadDesign.module.scss';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { getDesignData, updateDesign, deleteDesign } from '@/services/Design.service';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import uploadFile from 'utils/fileupload';

import { updateDesignStartingState, updateDesignItems } from 'utils/forms';

import PropTypes from 'prop-types';

function EditDesignPage({ design }) {
	const router = useRouter();

	const startingFormData = updateDesignStartingState(design);

	const [formData, setFormData] = useState(startingFormData);
	const [image, setImage] = useState('');

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

		if (!title || !description) {
			toast.error('Please fill all fields');
		} else if (title.trim().length === 0 || description.trim().length === 0) {
			toast.info('Please provide valid data');
		} else if (price < 0) {
			toast.error('Please provide a valid price');
		} else {
			const updatedDesignData = { id: design.id, ...formData };

			if (image !== '') {
				const uploadedImgUrl = await uploadFile(image);
				console.log(uploadedImgUrl);
				updatedDesignData.image = uploadedImgUrl;
			}

			toast.success('Updating the design');

			const updatedDesign = await updateDesign(updatedDesignData);
			if (updatedDesign) router.push('/account/profile');
		}
	};

	const deleteDesignHandler = async (e) => {
		e.preventDefault();
		const deleting = confirm('Do you really want to delete this design?');
		
		if (!deleting) return;
		
		const removed = await deleteDesign(design.id)
		if (removed) router.push('/account/profile');
	};

	const uploadDesignElements = updateDesignItems(
		formData,
		handleChange,
		image,
		handleFile
	);

	return (
		<Layout title='Edit your design'>
			<div className={styles.upload}>
				<h1>
					<FaCloudUploadAlt /> Edit this design
				</h1>
				<Image src={design.image} height={150} width={150} />

				<ToastContainer position='top-left' />
				<form className={styles.form} onSubmit={handleSubmit}>
					{uploadDesignElements.map((element) => (
						<Input key={element.id} {...element} />
					))}
					<Link href='/account/profile'>
						<a>Back</a>
					</Link>
					<button type='submit'>Edit design</button>
					<span onClick={deleteDesignHandler}>Delete design</span>
				</form>
			</div>
		</Layout>
	);
}

EditDesignPage.propTypes = {};

export default EditDesignPage;

export async function getServerSideProps(ctx) {
	const designId = ctx.query.id[0];
	const session = await getSession(ctx);

	if (!session) {
		ctx.res.writeHead(302, { Location: '/' });
		ctx.res.end();
		return {};
	} else {
		const data = await getDesignData(designId);

		if (data.author.id !== session.user.id) {
			ctx.res.writeHead(302, { Location: '/' });
			ctx.res.end();
			return {};
		}

		return {
			props: {
				design: data
			}
		};
	}
}
