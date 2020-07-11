import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import rootReducer from "./reducers/reducer";
import initialStore from "./other/initialStore";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import App from "./components/App";

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, initialStore(), middlewareEnhancer);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
