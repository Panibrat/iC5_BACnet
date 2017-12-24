"use strict"
export function avsReducers(avs = [], action) {      
    switch (action.type) {
        case "GET_AVS":
        const newAvs = [ ...action.payload ];
            return newAvs;
            break;
    }
    switch (action.type) {
        case "SET_AV": 
        const newAVs = avs.map((av) => {
            if (av._id == action.payload._id ) {
                av.value = action.payload.value;
                return av;
            }
            return av;
        });               
            return newAVs;
            break;
    }

    switch (action.type) {
        case "POST_AV":
            return [ ...avs, action.payload ];
            break;
    }

    return avs
}
