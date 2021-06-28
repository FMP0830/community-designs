import Link from 'next/link'

import PropTypes from 'prop-types'
import styles from "@/styles/pages/MainPage.module.scss"


const MainPageCard = ({style, text, link}) => {
  return (
		<div className={styles[style]}>
			<Link href={`/${link}`}>
				<a>{text}</a>
			</Link>
		</div>
	);
}

MainPageCard.propTypes = {
  style: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
}

export default MainPageCard
