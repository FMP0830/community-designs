import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '@/styles/pages/ProfilePage.module.scss';

function ProfileButton({url, style, text}) {
  return (
    <Link href={url}>
			<a className={styles[style]}>{text}</a>
		</Link>
  )
}

ProfileButton.propTypes = {
	url: PropTypes.string,
	style: PropTypes.string,
  text: PropTypes.string
};

export default ProfileButton

