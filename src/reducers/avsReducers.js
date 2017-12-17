"use strict"
export function avsReducers(state = [], action) {
    switch (action.type) {
        case "GET_AVS":
            return [...state, action.payload];
            break;
    }
    return state
}
