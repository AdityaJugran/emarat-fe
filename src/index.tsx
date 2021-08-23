import React from 'react';
import ReactDOM from 'react-dom';
import initSentry from 'app/initSentry';
import * as serviceWorker from 'serviceWorker';
import MasterLayout from 'app/MasterLayout';
import { listenUserAuthState } from 'lib/firebaseAuth';

initSentry();
listenUserAuthState();

ReactDOM.render(
	<React.StrictMode>
		<MasterLayout />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
