import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { STRIPE_PK } = publicRuntimeConfig;

import '@/styles/base/_reset.scss';
import '@/styles/base/_base.scss';
import { Provider } from 'next-auth/client';
import { CartProvider } from 'use-shopping-cart';
import { loadStripe } from '@stripe/stripe-js';

const stripePr = loadStripe(
	'pk_test_51J9SaLErFNVB7aBtPcH1EGTJjEv2oe7PH6wJ0qncPns7P6UR9wYhmUzlcJl614ZPoaWyThqgX3nHqD5oAAcEBHOY009K6Z5ZiS'
);

export default function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<CartProvider mode='checkout-session' stripe={stripePr} currency='EUR'>
				<Component {...pageProps} />
			</CartProvider>
		</Provider>
	);
}
