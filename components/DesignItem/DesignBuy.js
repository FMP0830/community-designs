import { useState } from 'react';
import styles from '@/styles/components/DesignPage/BuyControls.module.scss'
import PropTypes from 'prop-types';

function DesignBuy({ title, price, description, author, image, addToCart }) {
	const [amount, setAmount] = useState(1);

	const changeHandler = (e) => {
		e.preventDefault();
		setAmount(parseInt(e.target.value));
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const newCartItem = {
			title,
			description,
			price,
			amount,
			image,
			totalPrice: amount * price,
			author: {
				name: author.username,
				id: author.id
			}
		};

		addToCart(newCartItem);
		setAmount(1);
	};

	return (
		<div className={styles.buy}>
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
