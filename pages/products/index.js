import Layout from '@/components/layout/Layout';
import GalleryList from '@/components/gallery/GalleryList';
import { getAllDesigns } from '@/services/Design.service';

import PropTypes from 'prop-types';

function BuyProductsPage({ designs }) {
	return (
		<Layout title='Buy products'>
			<h1>Buy products</h1>
			<GalleryList designs={designs} />
		</Layout>
	);
}

BuyProductsPage.propTypes = {};

export default BuyProductsPage;

export async function getServerSideProps(ctx) {
	const data = await getAllDesigns();

	const designs = data.filter(
		(design) => design.valuation > 0 && design.totalVotes / design.valuation >= 0.5
	);

	return {
		props: {
			designs
		}
	};
}
