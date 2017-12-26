"use strict"
export function bvsReducers(bvs = [], action) {      
    switch (action.type) {
        case "GET_BVS":                
            return [ ...action.payload];
            break;
    }

    switch (action.type) {
        case "SET_BV": 
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
    switch (action.type) {
        case "POST_BV":
            return [ ...bvs, action.payload ];
            break;
    }
    switch (action.type) {
        case "DELETE_BV": 
        const newBVs = bvs.filter((bv) => {     
            return bv.title !== action.payload.title           
        });   
            return newBVs;
            break;
    }

    return bvs
}
