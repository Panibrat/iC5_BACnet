"use strict"
export function avsReducers(avs = [], action) {      
    switch (action.type) {
        case "GET_AVS":
        const newAvs = [ ...action.payload ];
            return newAvs;
            break;
    }
    return avs
}
