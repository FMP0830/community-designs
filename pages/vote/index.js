import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import styles from '@/scss_components/Gallery/FilterButtons.module.scss';
import GalleryList from '@/components/gallery/GalleryList';
import FilterButtons from '@/components/gallery/FilterButtons';
import { getAllDesigns } from '@/services/Design.service';
import PropTypes from 'prop-types';

function VoteProductsPage({ designs }) {
	const [showButtons, setShowButtons] = useState(false);
	const [allDesigns, setAllDesigns] = useState(designs);

	const sortDesigns = (input) => {
		const { category, type } = input;
		console.log(category, type);

		const sortedDesigns = [...allDesigns];

		if (type === 'desc') {
			if (category === 'title') {
				sortedDesigns.sort((a, b) => a.title.localeCompare(b.title));
			} else if (category === 'author') {
				sortedDesigns.sort((a, b) =>
					a.author.username.localeCompare(b.author.username)
				);
			} else {
				sortedDesigns.sort((a, b) => a[category] - b[category]);
			}
		} else {
			if (category === 'title' || category === 'author') {
				sortedDesigns.sort((a, b) => b.title.localeCompare(a.title));
			} else if (category === 'author') {
				sortedDesigns.sort((a, b) =>
					a.author.username.localeCompare(b.author.username)
				);
			} else {
				sortedDesigns.sort((a, b) => b[category] - a[category]);
			}
		}

		console.log(sortedDesigns);

		setAllDesigns(sortedDesigns);
	};

	return (
		<Layout title='Vote your favourite products'>
			<button
				className={styles.filter}
				onClick={() => setShowButtons(!showButtons)}>
				Show Filter Options
			</button>
			{showButtons && <FilterButtons sortDesigns={sortDesigns} />}
			<GalleryList designs={allDesigns} />
		</Layout>
	);
}

VoteProductsPage.propTypes = {};

export default VoteProductsPage;

export async function getServerSideProps(ctx) {
	const data = await getAllDesigns();

	const designs = data.filter(
		(design) =>
			design.totalVotes < 10 ||
			design.valuation === 0 ||
			(design.totalVotes >= 10 && design.totalVotes / design.valuation < 0.5)
	);

	return {
		props: {
			designs
		}
	};
}
