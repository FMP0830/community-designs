import styles from '@/styles/components/DesignPage/VoteControls.module.scss';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import PropTypes from 'prop-types';

function DesignVote({ click }) {
	return (
		<div className={styles.voteControls}>
			<h1>Do you want to vote this product?</h1>
			<div className={styles.thumbs}>
				<FaThumbsDown
					size={100}
					className={styles.down}
					onClick={() => click(-1)}
				/>
				<FaThumbsUp size={100} className={styles.up} onClick={() => click(1)} />
			</div>
		</div>
	);
}

DesignVote.propTypes = {};

export default DesignVote;
