import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex((item) => {
			console.log(item.title, action.item.title);
			return item.title === action.item.title;
		});
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;
		console.log('index', existingCartItemIndex);
		console.log('exists?', existingCartItem);

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
				totalPrice:
					(existingCartItem.amount + action.item.amount) *
					existingCartItem.price
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		};
	}
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
				totalPrice:
					(existingCartItem.amount + action.item.amount) *
					existingCartItem.price
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		};
	}

	if (action.type === 'CLEAR') {
		return defaultCartState;
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

	const addItemToCart = (item) => {
		dispatchCart({ type: 'ADD', item: item });
	};

	const removeItemFromCart = (id) => {
		dispatchCart({ type: 'REMOVE', id: id });
	};

	const clearCart = () => {
		dispatchCart({ type: 'CLEAR' });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCart,
		removeItem: removeItemFromCart,
		clearCart: clearCart
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
