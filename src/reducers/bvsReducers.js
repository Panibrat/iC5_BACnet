"use strict"
export function bvsReducers(bvs = [], action) {      
    switch (action.type) {
        case "GET_BVS":                
            return [...bvs, ...action.payload];
            break;
    }

    switch (action.type) {
        case "TOGGLE_BV": 
        const newBVs = bvs.map((bv) => {
            if (bv._id == action.payload._id ) {
                bv.value = action.payload.value;
                return bv;
            }
            return bv;
        });               
            return newBVs;
            break;
    }

    return bvs
}
