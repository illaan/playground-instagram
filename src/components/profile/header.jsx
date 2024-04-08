import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

function Header({ profile, photosCount, followerCount, setFollowerCount }) {
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
}

export default Header;

Header.propTypes = {
	setFollowerCount: PropTypes.func.isRequired,
	photosCount: PropTypes.number.isRequired,
	followerCount: PropTypes.number.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		fullName: PropTypes.string,
		following: PropTypes.array,
	}).isRequired,
};
