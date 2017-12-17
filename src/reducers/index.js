"use strict"
import {combineReducers} from 'redux';
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';
import {avsReducers} from './avsReducers';
import {bvsReducers} from './bvsReducers';

export default combineReducers({
    books: booksReducers,
    carts: cartReducers,
    avs: avsReducers,
    bvs: bvsReducers
});
