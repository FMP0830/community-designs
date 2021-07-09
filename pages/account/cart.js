import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/CartPage.module.scss';

import { FaTrash } from 'react-icons/fa';
import { useTable } from 'react-table';
import { useMemo } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cartCheckout from '@/services/Cart.service';

import { getUserData } from '@/services/User.service';
import { getSession } from 'next-auth/client';
function CartPage(props) {
	const {
		cartCount,
		totalPrice,
		cartDetails,
		incrementItem,
		decrementItem,
		removeItem,
		clearCart,
		redirectToCheckout
	} = useShoppingCart();

	

	const data = Object.values(cartDetails);

	const handleRemove = (value) => {
		removeItem(value);
		toast.dark('Item removed from cart');
	};

	const handleClearCart = (e) => {
		e.preventDefault();

		console.log('Trying to clear the cart');
		if (totalPrice !== 0) {
			clearCart();
			toast.dark('Cart cleared!');
		} else {
			toast.info('Cannot clear an empty cart!');
		}
	};

	const handleCheckout = async () => {
		console.log('handling checkout');

		const session = await cartCheckout(cartDetails);

		if (session.error) console.log(session.error);

		if (session) {
			toast.info('Redirecting you to payment, please wait a second');
			redirectToCheckout({ sessionId: session.id });
		}

		return session;
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Nº',
				accessor: 'quantity'
			},
			{
				Header: 'Price',
				accessor: 'price',
				Cell: ({ cell: { value } }) => <p>{value} €</p>
			},
			{
				Header: 'Total',
				accessor: 'value',
				Cell: ({ cell: { value } }) => <p>{value} €</p>
			},
			{
				Header: 'Author',
				accessor: 'author.name'
			},
			,
			{
				Header: 'Image',
				accessor: 'image',
				Cell: ({ cell: { value } }) => (
					<Image src={value} height={60} width={60} />
				)
			},
			{
				Header: 'Design Title',
				accessor: 'title'
			},
			{
				Header: 'Options',
				accessor: 'id',
				Cell: ({ cell: { value } }) => (
					<div className={styles.options}>
						<p onClick={() => incrementItem(value, 1)}> +1 </p>
						<p onClick={() => decrementItem(value, 1)}> -1 </p>
						<Link href={`/designs/${value}`}>
							<a>Back to Product</a>
						</Link>{' '}
						<FaTrash onClick={() => handleRemove(value)} />
					</div>
				)
			}
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<Layout title='cart'>
			<div className={styles.cart}>
				{/* <h1>Your cart data</h1> */}
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className={styles.purchase}>
					<ToastContainer position='bottom-right' />
					<button onClick={handleClearCart} className={styles.clear}>
						Clear
					</button>
					<h2>Items: {cartCount}</h2>
					<h2>Price: {totalPrice}€</h2>
					<button onClick={handleCheckout}>Purchase</button>
				</div>
			</div>
		</Layout>
	);
}

CartPage.propTypes = {};

export default CartPage;

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	if (!session) {
		ctx.res.writeHead(302, { Location: '/' });
		ctx.res.end();
		return {};
	} else {
		const data = await getUserData(session.user.id);
		console.log(data);

		return {
			props: {
				user: data
			}
		};
	}
}
