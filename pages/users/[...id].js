import PropTypes from 'prop-types';

import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/ProfilePage.module.scss';

import { getUserData } from '@/services/User.service';

function UserPublicProfile({ user }) {
	const { username, firstName, lastName, com_points, photo, designs } = user;

	return (
		<Layout title={`${username}'s profile`}>
			<>
				<div className={styles.userCard}>
					<div className={styles.userData}>
						<Image src={photo} alt={username} width={150} height={150} />
						<p>
							{firstName} {lastName}
						</p>
						<span>Com points: {com_points}</span>
					</div>
				</div>
				<div className={styles.gallery}></div>
			</>
		</Layout>
	);
}

UserPublicProfile.propTypes = {};

export default UserPublicProfile;

export async function getServerSideProps(ctx) {
	const { id } = ctx.params;

	const data = await getUserData(id);
	console.log(data);

	return {
		props: {
			user: data
		}
	};
}
