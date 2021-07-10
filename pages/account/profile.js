import Image from 'next/image';

import styles from '@/styles/pages/ProfilePage.module.scss';
import Layout from '@/components/layout/Layout';
import ProfileButton from '@/components/UI/ProfileButton';
import DesignCard from '@/components/UI/DesignCard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUserData, resendActivationMail } from '@/services/User.service';
import { getSession } from 'next-auth/client';

import { FaEnvelope } from 'react-icons/fa';

import { v4 as uuid4 } from 'uuid';

export default function Page({ user }) {
	const {
		id,
		username,
		firstName,
		lastName,
		address,
		com_points,
		photo,
		designs,
		orders
	} = user;

	const buttonData = [
		{
			id: uuid4(),
			url: `/account/editprofile`,
			style: 'edit',
			text: 'Edit your info'
		},
		{
			id: uuid4(),
			url: `/account/orders`,
			style: 'orders',
			text: 'Your orders'
		},
		{
			id: uuid4(),
			url: `/account/upload`,
			style: 'upload',
			text: 'Upload design'
		},
		{
			id: uuid4(),
			url: `/users/${id}`,
			style: 'profile',
			text: 'Public profile'
		},
		{
			id: uuid4(),
			url: `/account/password-reset/${id}`,
			style: 'delete',
			text: 'Change password'
		}
	];

	const sendMail = () => {
		toast.info('Check your inbox!');
		resendActivationMail(id);
	};

	if (user.active === false) {
		return (
			<Layout title='Profile page'>
				<ToastContainer position='top-right' />
				<div className={styles.info}>
					<h1>You have to activate your account</h1>
					<h2>Can't find the email in your inbox?</h2>
					<h3 onClick={sendMail}>Click here to resend it!</h3>
					<FaEnvelope onClick={sendMail} />
				</div>
			</Layout>
		);
	}

	return (
		<Layout title='Profile page'>
			<div className={styles.userCard}>
				<div className={styles.userData}>
					<Image src={photo} alt={username} width={150} height={150} />
					<p>
						{firstName} {lastName}
					</p>
					<span>Com points: {com_points}</span>
				</div>
				<div className={styles.buttons}>
					{buttonData.map((button) => (
						<ProfileButton key={button.id} {...button} />
					))}
				</div>
			</div>
			<div className={styles.gallery}>
				{designs.map((el) => {
					return <DesignCard key={el.id} {...el} />;
				})}
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
