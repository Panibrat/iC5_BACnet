"use strict"
export function avsReducers(avs = [], action) {      
    switch (action.type) {
        case "GET_AVS":
        const newAvs = [...avs, ...action.payload];       
            return newAvs;
            break;
    }
    return avs
}
