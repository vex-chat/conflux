import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { KeyRing, Client, Utils } from 'libvex';

export const keyring = new KeyRing(':memory:', localStorage.getItem('pk'));
export const client = new Client('dev.vex.chat', keyring, null, true);

client.on('ready', async () => {
  if (!localStorage.getItem('pk')) {
    await client.register();
    localStorage.setItem('pk', Utils.toHexString(keyring.getPriv()));
  }

  await client.auth();
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
