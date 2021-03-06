import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/components/DesignPage/DesignPage.module.scss';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import PropTypes from 'prop-types';

function DesignInfo({
	image,
	title,
	description,
	price,
	totalVotes,
	valuation,
	author: { id, username, photo }
}) {
	return (
		<div className={styles.info}>
			<Zoom zoomMargin={150}>
				<Image src={image} height={2000} width={2000} />
			</Zoom>
			<div className={styles.text}>
				<div className={styles.designInfo}>
					<h2>{title}</h2>
					<h4>{description}</h4>
				</div>
				<div className={styles.designAuthor}>
					<div>
						<Link href={`/users/${id}`}>
							<a>{username}</a>
						</Link>
						<Image src={photo} height='100%' width='100%' />
					</div>
					<h4>Price: {price}€</h4>
					<div className={styles.score}>
						<h5>Total votes: {totalVotes}</h5>
						<h5>Total score: {valuation}</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

DesignInfo.propTypes = {};

export default DesignInfo;
