import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/CartPage.module.scss';

import { FaTrash } from 'react-icons/fa';
import { useTable } from 'react-table';
import { useContext, useMemo } from 'react';
import CartContext from '@/context/cart-context';

function cart(props) {
	const cartCtx = useContext(CartContext);

	//const data = useMemo(() => cartCtx.items, []);
	const data = cartCtx.items;

	const clearCart = (e) => {
		e.preventDefault();
		cartCtx.clearCart();
	};
	console.log(data);

	const columns = useMemo(
		() => [
			{
				Header: 'Nº',
				accessor: 'amount'
			},
			{
				Header: 'Price',
				accessor: 'price'
			},
			{
				Header: 'Total',
				accessor: 'totalPrice'
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
					<>
						<Link href={`/designs/${value}`}>
							<a>Back to Product</a>
						</Link>{' '}
						<FaTrash onClick={() => cartCtx.removeItem(value)} />
					</>
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
					<button onClick={clearCart} className={styles.clear}>
						Clear
					</button>
					<h2>Items: {cartCtx.items.length}</h2>
					<h2>Price: {cartCtx.totalAmount}€</h2>
					<button>Purchase</button>
				</div>
			</div>
		</Layout>
	);
}

cart.propTypes = {};

export default cart;
