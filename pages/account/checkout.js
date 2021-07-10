import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Layout from '@/components/layout/Layout';

import { useShoppingCart } from 'use-shopping-cart';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';
import { getUserData } from '@/services/User.service';
import { getSession } from 'next-auth/client';

import { createPurchase } from '@/services/Cart.service';

function CheckoutPage({ user }) {
	const router = useRouter();

	const [transactionDone, setTransactionDone] = useState(false);

	const { cartCount, totalPrice, cartDetails, clearCart } = useShoppingCart();

	const handleCheckout = async () => {
		const purchase = {
			numberOfItems: cartCount,
			totalPrice,
			items_detail: Object.values(cartDetails),
			items_id: Object.keys(cartDetails),
			userPurchasing: user.id,
			userSelling: Object.values(cartDetails).map((obj) => obj.author.id)
		};

		const newPurchase = await createPurchase(purchase);

		if (newPurchase.error) toast.error(newPurchase.error);
		if (newPurchase && !newPurchase.error) {
			if (cartCount > 0) {
				clearCart();
				router.push('/account/profile');
			}
		}
	};

	useEffect(() => setTransactionDone(true), []);

	if (transactionDone) handleCheckout();
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
