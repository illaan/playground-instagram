import PropTypes from "prop-types";

function Image({ src, caption }) {
	return (
		<div>
			<img className="mx-auto" src={src} alt={caption} />
		</div>
	);
}

export default Image;
