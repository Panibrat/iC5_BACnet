"use strict"
import axios from 'axios';

export function getBVs() {
  return function(dispatch){
    axios.get('/bv')
    .then((responce) => {
      var bvs = responce.data;      
      dispatch({
        type:"GET_BVS",
        payload: bvs
      })
    })
    .catch((err) => {
      console.log("\nGET responce ERROR\n", err);
      dispatch({
        type:"GET_BVS_REJECTED",
        payload:"there was an error while getting binary values"        
      })
    })
  }
}
