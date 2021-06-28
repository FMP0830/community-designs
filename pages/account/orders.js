import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/ProfilePage.module.scss';
import { getSession } from 'next-auth/client';
import { getUserData } from '@/services/User.service';

import PropTypes from 'prop-types';

function OrdersPage(props) {
	return <Layout title='Your orders'>
    <h1>Orders page</h1>
  </Layout>;
}

OrdersPage.propTypes = {};

export default OrdersPage;

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
