import PropTypes from 'prop-types';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import styles from '@/styles/pages/CartPage.module.scss';

import { useTable } from 'react-table';
import { useContext } from 'react';
import CartContext from '@/context/cart-context';

function cart(props) {
	const cartCtx = useContext(CartContext);

	const data = cartCtx.items;

	console.log(data);

	const columns = [
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
		}
	];

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<Layout title='cart'>
			<div className={styles.cart}>
				<h1>Your cart data</h1>
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
					<h2>Items: {cartCtx.items.length}</h2>
					<h2>Price: {cartCtx.totalAmount}</h2>
					<button>Purchase</button>
				</div>
			</div>
		</Layout>
	);
}

cart.propTypes = {};

export default cart;
