import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

import * as Firebase from 'firebase';
import { GlobalStyles } from './global-styles';
import { FirebaseContext } from './context/firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebase = Firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase }}>
      <GlobalStyles />
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
