import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
	const history = useHistory();
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const onLogoutClick = () => {
		authService.signOut();
		history.push('/');
	};
	// const getMyNweets = async () => {
	// 	const nweets = await dbService
	// 		.collection('nweets')
	// 		.where('creatorId', '==', userObj.uid)
	// 		.orderBy('createdAt', 'desc')
	// 		.get();
	// 	console.log(nweets.docs.map((nweet) => nweet.data()));
	// };
	// useEffect(() => {
	// 	getMyNweets();
	// });
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName && newDisplayName !== '') {
			await userObj.updateProfile({
				displayName: newDisplayName,
			});
			refreshUser();
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input type='text' value={newDisplayName} onChange={onChange} />
				<input type='submit' value='변경' />
			</form>
			<button onClick={onLogoutClick}>LogOut</button>
		</>
	);
};
export default Profile;
