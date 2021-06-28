import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/DesignCard.module.scss';

import PropTypes from 'prop-types';

function DesignCard({ id, title, image, price, totalVotes, valuation }) {
	return (
		<div className={styles.card}>
			<Image src={image} width={150} height={150} />
			<div className={styles.content}>
				<h3>{title}</h3>
				<h4>Price: {price}€</h4>
				<h4>
					<span>Score: {valuation} </span>
					<span>Votes: {totalVotes} </span>
				</h4>
				<div>
					<Link href={`/designs/${id}`}>
						<a>See more</a>
					</Link>
					<Link href={`/designs/edit/${id}`}>
						<a>Edit</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

DesignCard.propTypes = {};

export default DesignCard;
