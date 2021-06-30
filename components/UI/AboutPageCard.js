import PropTypes from 'prop-types';
import styles from '@/styles/pages/AboutPage.module.scss';

const AboutPageCard = ({ style, num, text }) => {
	return (
		<li className={styles[style]}>
			<span>{num}</span>
			<p>{text}</p>
		</li>
	);
};

AboutPageCard.propTypes = {
	style: PropTypes.string,
	num: PropTypes.string,
	text: PropTypes.string
};

export default AboutPageCard;
