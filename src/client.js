"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// React-Router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import combined reducers
import reducers from './reducers/index';

// Import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

const middleware = applyMiddleware(thunk, logger);

// Step 1 create the store
const store = createStore(reducers, middleware);

// Import Components
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';


const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={BooksList} />
        <Route path='/admin' component={BooksForm} />
        <Route path='/cart' component={Cart} />
      </Route>
    </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);


// POST books
// store.dispatch(postBooks(
//   [
//     {
//       id: 1,
//       title: 'this is the book title',
//       description: 'this is the book desc',
//       price: 33.33
//     },
//     {
//       id: 2,
//       title: 'this is the SECOND book title',
//       description: 'this is the SECOND book desc',
//       price: 44
//     },
//     {
//       id: 3,
//       title: 'this is the THIRD book title',
//       description: 'this is the THIRD book desc',
//       price: 55
//     }
//   ]
// ))


// POSTing another book
// store.dispatch(postBooks(
//   [
//     {
//       id: 3,
//       title: 'this is the THIRD book title',
//       description: 'this is the THIRD book desc',
//       price: 55
//     }
//   ]
// ))


// DELETE a book
// store.dispatch(deleteBooks(
//   {id: 1}
// ))


// UPDATE a book
// store.dispatch(updateBooks(
//   {
//     id: 2,
//     title: 'Learn React in 24h'
//   }
// ))


// ---> CART ACTIONS <---
// ADD to cart
// store.dispatch(addToCart([
//   { 
//     id: 2,
//     title: 'Superman' 
//   }
// ]));
