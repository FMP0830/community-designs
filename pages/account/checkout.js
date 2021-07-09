import PropTypes from 'prop-types';

import Layout from '@/components/layout/Layout';

import { useShoppingCart } from 'use-shopping-cart';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUserData } from '@/services/User.service';
import { getSession } from 'next-auth/client';

function CheckoutPage({ user }) {
	const {
		cartCount,
		totalPrice,
		cartDetails,
		clearCart,
	} = useShoppingCart();

	const purchase = {
		numberOfItems: cartCount,
		totalPrice,
		items_detail: Object.values(cartDetails),
		items_id: Object.keys(cartDetails),
		userPurchasing: user.id,
		userSelling: Object.values(cartDetails).map((obj) => obj.author.id)
	};

	console.log(purchase);

	return (
		<Layout title='Checkout'>
			<h1>
				Your order has been placed correctly, you will receive an email with
				further details
			</h1>
		</Layout>
	);
}

CheckoutPage.propTypes = {};

export default CheckoutPage;

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
