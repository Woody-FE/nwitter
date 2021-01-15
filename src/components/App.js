import AppRouter from 'components/Router';
import { useState, useEffect } from 'react';
import { authService } from 'fbase';

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : <span>초기화중...</span>}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
