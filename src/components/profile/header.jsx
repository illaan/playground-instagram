import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

function Header({
	profile: {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		following = [],
		followers = [],
		username: profileUsername,
	},
	photosCount,
	followerCount,
	setFollowerCount,
}) {
	const { user } = useUser();
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
	const [followersOpen, setFollowersOpen] = useState(false);
	const [followingOpen, setFollowingOpen] = useState(false);
	console.log(following, "following");
	const activeButtonFollow = user.username && user.username !== profileUsername;

	const handleToggleFollow = async () => {
		setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
		setFollowerCount({
			followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
		});
		await toggleFollow(
			isFollowingProfile,
			user.docId,
			profileDocId,
			profileUserId,
			user.userId
		);
	};

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			);
			setIsFollowingProfile(!!isFollowing);
		};

		if (user.username && profileUserId) {
			isLoggedInUserFollowingProfile();
		}
	}, [user.username, profileUserId]);

	return (
		<div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
			<div className="container flex justify-center">
				{user.username && (
					<img
						className="rounded-full h-40 w-40 flex"
						src={`/images/avatars/${profileUsername}.jpg`}
						alt={`${profileUsername}`}
					/>
				)}
			</div>
			<div className="flex items-center justify-center flex-col col-span-2">
				<div className="container flex items-center">
					<p className="text-2xl mr-4">{profileUsername}</p>
					{activeButtonFollow && (
						<button
							className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
							type="button"
							onClick={handleToggleFollow}
						>
							{isFollowingProfile ? "Unfollow" : "Follow"}
						</button>
					)}
				</div>
				<div className="container flex mt-4">
					{!followers || !following ? (
						<Skeleton count={1} width={677} height={24} />
					) : (
						<>
							<p className="mr-10">
								<span className="font-bold">{photosCount}</span> photos
							</p>
							<button className="mr-10 cursor-pointer">
								<span className="font-bold">{followerCount}</span>
								{` `}
								{followerCount === 1 ? `follower` : `followers`}
							</button>
							<button
								onClick={() => setFollowingOpen(true)}
								className="mr-10 cursor-pointer"
							>
								<span className="font-bold">{following?.length}</span> following
							</button>
						</>
					)}
					{followingOpen ? (
						<div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20">
							<div className="relative bg-white z-30 w-5/12 p-20">
								{following.map((item) => (
									<div className="z-40">{item?.username}</div>
								))}
							</div>
						</div>
					) : null}
				</div>
				<div className="container mt-4">
					<p className="font-medium">
						{!fullName ? <Skeleton count={1} height={24} /> : fullName}
					</p>
				</div>
			</div>
		</div>
	);
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
		followers: PropTypes.array,
	}).isRequired,
};
