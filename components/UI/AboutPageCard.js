import PropTypes from 'prop-types'

const AboutPageCard = ({num, text}) => {
  return (
		<li>
			<span>{num}</span>
			<p>{text}</p>
		</li>
	);
}

AboutPageCard.propTypes = {
	num: PropTypes.string,
	text: PropTypes.string
};

export default AboutPageCard
