"use strict"
//import {combineReducers} from 'redux';
import {avsReducers} from './avsReducers';
import {bvsReducers} from './bvsReducers';

// export default combineReducers({
//     analog: avsReducers,
//     binary: bvsReducers
// });


export default function reducers(state = {}, action) {
    return {
        analog: avsReducers(state.analog, action),
        binary: bvsReducers(state.binary, action)
    }
};