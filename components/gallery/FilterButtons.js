import styles from '@/scss_components/Gallery/FilterButtons.module.scss';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import PropTypes from 'prop-types';

function FilterButtons({ sortDesigns }) {
	return (
		<div className={styles.filters}>
			<button
				className={styles.price}
				onClick={() => sortDesigns({ category: 'price', type: 'desc' })}>
				Price <FaArrowDown />
			</button>
			<button
				className={styles.price}
				onClick={() => sortDesigns({ category: 'price', type: 'asc' })}>
				Price <FaArrowUp />
			</button>
			<button
				className={styles.title}
				onClick={() => sortDesigns({ category: 'title', type: 'desc' })}>
				Title <FaArrowDown />
			</button>
			<button
				className={styles.title}
				onClick={() => sortDesigns({ category: 'title', type: 'asc' })}>
				Title <FaArrowUp />
			</button>
			<button
				className={styles.score}
				onClick={() => sortDesigns({ category: 'valuation', type: 'desc' })}>
				Score <FaArrowDown />
			</button>
			<button
				className={styles.score}
				onClick={() => sortDesigns({ category: 'valuation', type: 'asc' })}>
				Score <FaArrowUp />
			</button>
			<button
				className={styles.votes}
				onClick={() => sortDesigns({ category: 'totalVotes', type: 'desc' })}>
				Votes <FaArrowDown />
			</button>
			<button
				className={styles.votes}
				onClick={() => sortDesigns({ category: 'totalVotes', type: 'asc' })}>
				Votes <FaArrowUp />
			</button>
			<button
				className={styles.author}
				onClick={() => sortDesigns({ category: 'author', type: 'desc' })}>
				Author <FaArrowDown />
			</button>
			<button
				className={styles.author}
				onClick={() => sortDesigns({ category: 'author', type: 'asc' })}>
				Author <FaArrowUp />
			</button>
		</div>
	);
}

FilterButtons.propTypes = {};

export default FilterButtons;
