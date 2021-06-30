import PropTypes from 'prop-types';
import DesignCard from '@/components/UI/DesignCard';
import styles from '@/styles/components/GalleryList.module.scss';

function GalleryList({ designs }) {
	return (
		<div className={styles.container}>
			{designs &&
				designs.map((design) => <DesignCard key={design.id} {...design} />)}
		</div>
	);
}

GalleryList.propTypes = {};

export default GalleryList;
