import Layout from '@/components/layout/Layout';
import styles from '@/styles/components/DesignPage/DesignPage.module.scss';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import CartContext from '@/context/cart-context';

import { getDesignData, voteDesign } from '@/services/Design.service';
import DesignMessage from '@/components/DesignItem/DesignMessage';
import DesignInfo from '@/components/DesignItem/DesignInfo';
import DesignVote from '@/components/DesignItem/DesignVote';
import DesignBuy from '@/components/DesignItem/DesignBuy';

import PropTypes from 'prop-types';
function DesignDetailsPage({ design }) {
	const router = useRouter();

	const [session, loading] = useSession();
	const [isAuthor, setIsAuthor] = useState(false);
	const [isInactive, setIsInactive] = useState(false);
	const [canVote, setCanVote] = useState(false);
	const [hasVoted, setHasVoted] = useState(false);
	const [canBuy, setCanBuy] = useState(false);

	function checkStatus() {
		if (session) {
			console.log(session);
			if (session.user.id === design.author.id) {
				setIsAuthor(true);
				return;
			}

			if (session.user.active === false) {
				setIsInactive(true);
				return;
			}

			if (
				design.totalVotes >= 10 &&
				design.totalVotes / design.valuation >= 0.5 &&
				session.user.active === true
			) {
				setCanBuy(true);
				return;
			}

			if (design.voted_by.includes(session.user.id)) {
				setHasVoted(true);
				return;
			}

			if (session.user.active === false) {
				setCanVote(false);
				return;
			}

			setCanVote(true);
		}

		console.log(
			'session',
			session,
			'isInactive',
			isInactive,
			'isAuthor',
			isAuthor,
			'canVote',
			canVote,
			'hasVoted',
			hasVoted,
			'canBuy',
			canBuy
		);
	}

	async function submitVote(value) {
		console.log();

		const voteSubmitted = await voteDesign({ value, designId: design.id });
		if (voteSubmitted) router.push('/vote');
	}

	useEffect(() => {
		checkStatus();
	}, [session]);

	return (
		<Layout title={design.title}>
			<div className={styles.container}>
				<DesignInfo {...design} />
				{!session && (
					<DesignMessage text='You have to log in to buy or vote products!' />
				)}
				{isInactive && (
					<DesignMessage text='You have to activate your account to buy or vote products!' />
				)}
				{isAuthor && (
					<DesignMessage text="You are this design's author, so you can't vote or buy it" />
				)}
				{hasVoted && (
					<DesignMessage text='You have already voted this design!' />
				)}
				{canVote && <DesignVote click={submitVote} />}
				{canBuy && <DesignBuy {...design} />}
			</div>
		</Layout>
	);
}

DesignDetailsPage.propTypes = {};

export default DesignDetailsPage;

export async function getServerSideProps(ctx) {
	const designId = ctx.query.id[0];

	const data = await getDesignData(designId);

	return {
		props: {
			design: data
		}
	};
}
