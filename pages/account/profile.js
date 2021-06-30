import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/ProfilePage.module.scss';
import { getSession } from 'next-auth/client';
import { getUserData } from '@/services/User.service';
import DesignCard from '@/components/UI/DesignCard';

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

	return (
		<Layout title='Profile page'>
			<>
				<div className={styles.userCard}>
					<div className={styles.userData}>
						<Image src={photo} alt={username} width={150} height={150} />
						<p>
							{firstName} {lastName}
						</p>
						<span>Com points: {com_points}</span>
					</div>
					<div className={styles.buttons}>
						<Link href='/account/editprofile'>
							<a className={styles.edit}>Edit your info</a>
						</Link>
						<Link href='/account/orders'>
							<a className={styles.orders}>Your orders</a>
						</Link>
						<Link href='/account/upload'>
							<a className={styles.upload}>Upload design</a>
						</Link>
						<Link href={`/users/${id}`}>
							<a className={styles.profile}>Public profile</a>
						</Link>
						<Link href='/'>
							<a className={styles.delete}>Delete Profile</a>
						</Link>
					</div>
				</div>
				<div className={styles.gallery}>
					{designs.map((el) => {
						return <DesignCard key={el.id} {...el} />;
					})}
				</div>
			</>
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
