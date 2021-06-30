import Image from 'next/image';

import styles from '@/styles/pages/ProfilePage.module.scss';
import Layout from '@/components/layout/Layout';
import ProfileButton from '@/components/UI/ProfileButton';
import DesignCard from '@/components/UI/DesignCard';

import { getUserData } from '@/services/User.service';
import { getSession } from 'next-auth/client';
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
			url: `/`,
			style: 'delete',
			text: 'Delete profile'
		}
	];

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

