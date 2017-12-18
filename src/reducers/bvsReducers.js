"use strict"
export function bvsReducers(bvs = [], action) {      
    switch (action.type) {
        case "GET_BVS":                
            return [...bvs, ...action.payload];
            break;
    }
    return bvs
}
