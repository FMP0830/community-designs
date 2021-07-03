import '@/styles/base/_reset.scss';
import '@/styles/base/_base.scss';
import { Provider } from 'next-auth/client';
import CartProvider from './../context/cart-provider';

export default function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<CartProvider>
				<Component {...pageProps} />
			</CartProvider>
		</Provider>
	);
}
