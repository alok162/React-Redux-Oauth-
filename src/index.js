import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {createStore} from 'redux';
import allReducers from './components/Reducer/Index';
import {Provider} from 'react-redux';
import App1 from './components/Footer/Footer';

const store = createStore(allReducers);


ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();

 