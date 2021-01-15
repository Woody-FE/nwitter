import React from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
	const history = useHistory();
	const onLogoutClick = () => {
		authService.signOut();
		history.push('/');
	};
	return (
		<>
			<button onClick={onLogoutClick}>LogOut</button>
		</>
	);
};
export default Profile;
