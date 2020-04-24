import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

function App() {
	const [darkMode, setDarkMode] = useState(getInitialMode());

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(darkMode));
	}, [darkMode]);

	function getInitialMode() {
		const isReturningUser = 'dark' in localStorage;
		const savedMode = JSON.parse(localStorage.getItem('dark'));
		const darkPreferredMode = getPreferredColorMode();

		// If a mode was saved -> dark / light
		if (isReturningUser) {
			return savedMode;
		} else if (darkPreferredMode) {
			// If the preferred mode is dark -> dark
			return true;
		} else {
			// otherwise -> light
			return false;
		}
	}

	function getPreferredColorMode() {
		if (!window.matchMedia) return;

		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	return (
		<div className={darkMode ? 'dark-mode' : 'light-mode'}>
			<nav>
				<div className='toggle-container'>
					<button onClick={() => setDarkMode((prevMode) => !prevMode)}>
						Toggle Mode
					</button>
				</div>
			</nav>
			<main>
				<h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
				<h2>Toggle the switch to see some magic happen!</h2>
			</main>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
