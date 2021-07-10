import Layout from '@/components/layout/Layout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { activateUser } from '@/services/User.service';

function ActivateAcountPage({ userId }) {
	const router = useRouter();

	const [isActive, setIsActive] = useState(false);
	useEffect(() => {
		checkIfActive(userId);
	}, []);

	const checkIfActive = async (userId) => {
		const activeUser = await activateUser(userId);

		if (activeUser.error) {
			toast.error(activeUser.error);
			setIsActive(true);
		}
		if (activeUser.message) {
			toast.success(activeUser.message);
			setIsActive(true);
		}
	};

	if (isActive) router.push('/account/login');

	return (
		<Layout title='Activating your account'>
			<ToastContainer position='top-left' />

			<h1>Account activation page</h1>
		</Layout>
	);
}

export default ActivateAcountPage;

export async function getServerSideProps(ctx) {
	const userId = ctx.query.id[0];

	return {
		props: {
			userId
		}
	};
}
