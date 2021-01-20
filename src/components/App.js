import AppRouter from 'components/Router';
import { useState, useEffect } from 'react';
import { authService } from 'fbase';

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObj({
			uid: user.uid,
			displayName: user.displayName,
			updateProfile: (args) => user.updateProfile(args),
		});
	};
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObj({
					uid: user.uid,
					displayName: user.displayName,
					updateProfile: (args) => user.updateProfile(args),
				});
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<AppRouter
					isLoggedIn={Boolean(userObj)}
					userObj={userObj}
					refreshUser={refreshUser}
				/>
			) : (
				<span>초기화중...</span>
			)}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
