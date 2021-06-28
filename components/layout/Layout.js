import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '@/styles/layout/Layout.module.scss';

function Layout({
	title = 'Community Designs',
	description = 'A social platform to upload, vote & but community endorsed designs',
	children
}) {
	const router = useRouter();

	return (
		<div className={styles.layout}>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta name='description' content={description} />
				<meta
					property='og:url'
					content={`http://localhost:3000${router.asPath}`}
					key='ogurl'
				/>
				<meta property='og:site_name' content={title} key='ogsitename' />
				<meta property='og:title' content={title} key='ogtitle' />
				<meta property='og:description' content={description} key='ogdesc' />
				<title>{title}</title>
			</Head>

			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}

Layout.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string
};

export default Layout;
