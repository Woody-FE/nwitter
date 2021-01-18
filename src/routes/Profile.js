import React, { useEffect } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
	const history = useHistory();
	const onLogoutClick = () => {
		authService.signOut();
		history.push('/');
	};
	const getMyNweets = async () => {
		const nweets = await dbService
			.collection('nweets')
			.where('creatorId', '==', userObj.uid)
			.orderBy('createdAt', 'desc')
			.get();
		console.log(nweets);
	};
	useEffect(() => {
		getMyNweets();
	});
	return (
		<>
			<button onClick={onLogoutClick}>LogOut</button>
		</>
	);
};
export default Profile;
