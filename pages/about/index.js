import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/AboutPage.module.scss';

export default function AboutPage() {
	return (
		<Layout title='About'>
			<h1 className={styles.h1}>Create your own designs and get paid for it</h1>
			<div>
				<ul className={styles.items}>
					{/* <AboutPageCard num='1' text='You can create an account for free.' /> */}
					<li className={styles.one}>
						<span>1</span>
						<p>You can create an account for free.</p>
					</li>
					<li className={styles.two}>
						<span>2</span>
						<p>
							If people like your designs and vote them positively, they will be
							promoted to our purchase gallery.
						</p>
					</li>
					<li className={styles.three}>
						<span>3</span>
						<p>You will get money for each product we sell with your design.</p>
					</li>
				</ul>
			</div>
		</Layout>
	);
}
