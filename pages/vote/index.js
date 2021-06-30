import Layout from '@/components/layout/Layout';
import GalleryList from '@/components/gallery/GalleryList';
import { getAllDesigns } from '@/services/Design.service';

import PropTypes from 'prop-types';

function VoteProductsPage({ designs }) {
	return (
		<Layout title='Vote your favourite products'>
			<h1>Vote products</h1>
			<GalleryList designs={designs} />
		</Layout>
	);
}

VoteProductsPage.propTypes = {};

export default VoteProductsPage;

export async function getServerSideProps(ctx) {
	const data = await getAllDesigns();
	console.log(data);

	return {
		props: {
			designs: data
		}
	};
}
