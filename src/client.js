"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import reducers from './reducers/index';

import MainLis from './components/pages/MainList';
import AVsList from './components/pages/AvList';
import BVsList from './components/pages/BvList';

import Menu from './components/menu';
import Footer from './components/footer';
import AdminForm from './components/AdminForm';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middeleware = applyMiddleware(
    thunk,
    logger,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
const store = createStore(reducers, composeEnhancers(middeleware));
store.subscribe(function() {
  //console.log('current state is: ', store.getState());
});

const Routes = (
  <Provider store = {store} >
    <BrowserRouter>
      <div> 
        <Menu />
          <Switch>
            <Route exact path="/" component={MainLis}/>
            <Route exact path="/binary" component={BVsList}/>
            <Route exact path="/analog" component={AVsList}/>
            <Route path="/admin" component={AdminForm}/>
            <Route path="/cart" component={AVsList}/>
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);

render(Routes, document.getElementById('app')
);
