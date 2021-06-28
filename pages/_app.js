import '@/styles/base/_reset.scss';
import '@/styles/base/_base.scss';
import { Provider } from 'next-auth/client';

export default function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Component {...pageProps} />
		</Provider>
	);
}
