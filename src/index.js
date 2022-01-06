import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Pinakas from './components/Pinakas';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import { client } from './components/Pinakas'
import App from './components/App';
import Dbank from './components/Dbank';

setInterval(() => {
function refreshPage(){ window. location. reload(true)};
}, 1000);
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pinakas />
    <App />
    <Dbank />
  </ApolloProvider>,
  document.getElementById('root'),
);


serviceWorker.unregister();