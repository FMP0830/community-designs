import { useState } from 'react';
import styles from '@/styles/components/DesignPage/BuyControls.module.scss';
import PropTypes from 'prop-types';
import { useShoppingCart } from 'use-shopping-cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DesignBuy({ id, title, price, description, author, image }) {
	const [amount, setAmount] = useState(1);

	const { addItem } = useShoppingCart();

	const changeHandler = (e) => {
		e.preventDefault();
		setAmount(parseInt(e.target.value));
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const newCartItem = {
			id,
			title,
			description,
			price,
			image,
			totalPrice: amount * price,
			author: {
				name: author.username,
				id: author.id
			}
		};

		addItem(newCartItem, amount);
		toast.success(`Added ${amount} items to your cart`);
		setAmount(1);
	};

	return (
		<div className={styles.buy}>
			<ToastContainer position='bottom-right' />
			<form onSubmit={submitHandler}>
				<p>Do you want to buy this design?</p>
				<input type='number' onChange={changeHandler} value={amount} min={1} />
				<button type='submit'>Add to cart</button>
			</form>
		</div>
	);
}

DesignBuy.propTypes = {};

export default DesignBuy;
