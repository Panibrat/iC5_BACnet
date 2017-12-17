"use strict"
export function bvsReducers(state = [], action) {
    switch (action.type) {
        case "GET_BVS":
            return [...state, action.payload];
            break;
    }
    return state
}
