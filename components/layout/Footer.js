import { FaGithub } from 'react-icons/fa';

import styles from '@/styles/layout/Footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Developed by Aleix Badia & Fede Muniente &#945; Ironhack Barcelona
				&copy;
			</p>

			<a href='https://www.github.com/fmp0830' target='_blank'>
				<FaGithub />
			</a>
		</footer>
	);
}
