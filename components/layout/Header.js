import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/client';
import { useContext } from 'react';
import CartContext from '@/context/cart-context';

import { FaShoppingCart } from 'react-icons/fa';
import styles from '@/styles/layout/Header.module.scss';
import { useShoppingCart } from 'use-shopping-cart';

export default function Header({ user }) {

	const { cartCount, totalPrice } = useShoppingCart();

	const [session, loading] = useSession();

	return (
		<nav className={styles.header}>
			<span>
				{' '}
				<Link href='/'>
					<a>Community Designs</a>
				</Link>
			</span>
			<ul>
				<li className={styles.buy}>
					<Link href='/products'>
						<a>Buy</a>
					</Link>
				</li>
				<li className={styles.vote}>
					<Link href='/vote'>
						<a>Vote</a>
					</Link>
				</li>{' '}
				{session ? (
					<>
						<li>
							<Link href='/account/profile'>
								<a>{session.user.username}</a>
							</Link>
						</li>
						<li>
							<Link href='/account/cart'>
								<a className={styles.cart}>
									{totalPrice}€
									<FaShoppingCart />
									{cartCount}
								</a>
							</Link>
						</li>
						<li>
							<Link href='/account/profile'>
								<a onClick={signOut}>Logout</a>
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href='/account/login'>
								<a>Log In</a>
							</Link>
						</li>
						<li>
							<Link href='/account/signup'>
								<a>Sign Up</a>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
