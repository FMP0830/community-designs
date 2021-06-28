import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/MainPage.module.scss';

import MainPageCard from './../components/UI/MainPageCard';

export default function Home() {
	return (
		<Layout>
			<h1 className={styles.h1}>
				Make sure you only buy what is trending right now
			</h1>
			<div className={styles.cards}>
				<MainPageCard style='buy' link='products' text='Products' />
				<MainPageCard style='vote' link='vote' text='Vote' />
				<MainPageCard
					style='join'
					link='about'
					text='Become one of our designers'
				/>
			</div>
		</Layout>
	);
}
