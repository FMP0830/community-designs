import { FaGithub } from 'react-icons/fa';

import styles from '@/styles/layout/Footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Developed by{' '}
				<a href='https://www.github.com/aleixbadia' target='_blank'>
					Aleix Badia
				</a>{' '}
				&{' '}
				<a href='https://www.github.com/fmp0830' target='_blank'>
					Fede Muniente
				</a>{' '}
				&#945;{' '}
				<a href='https://www.ironhack.com/en/barcelona' target='_blank'>
					Ironhack Barcelona
				</a>{' '}
				&copy;
			</p>

			<a href='https://www.github.com/fmp0830' target='_blank'>
				<FaGithub />
			</a>
		</footer>
	);
}
