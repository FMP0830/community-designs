import PropTypes from 'prop-types';
import styles from '@/styles/components/DesignPage/DesignMessage.module.scss';

function DesignMessage({ text }) {
	return (
		<div className={styles.message}>
			<h2>{text}</h2>
		</div>
	);
}

DesignMessage.propTypes = {
	text: PropTypes.string
};

export default DesignMessage;
