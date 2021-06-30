import Layout from '@/components/layout/Layout';
import AboutPageCard from '@/components/UI/AboutPageCard';
import styles from '@/styles/pages/AboutPage.module.scss';
import { v4 as uuid4 } from 'uuid';

export default function AboutPage() {
	
	const cardData = [
		{
			id: uuid4(),
			style: 'one',
			num: '1',
			text: 'You can create an account for free.'
		},
		{
			id: uuid4(),
			style: 'two',
			num: '2',
			text: 'If people like your designs and vote them positively, they will be promoted to our purchase gallery.'
		},
		{
			id: uuid4(),
			style: 'three',
			num: '3',
			text: 'You will get money for each product we sell with your design.'
		}
	];
	
	return (
		<Layout title='About'>
			<h1 className={styles.h1}>Create your own designs and get paid for it</h1>
			<div>
				<ul className={styles.items}>
					{cardData.map((card) => (
						<AboutPageCard key={card.id} {...card} />
					))}
				</ul>
			</div>
		</Layout>
	);
}
