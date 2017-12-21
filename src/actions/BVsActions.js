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

export function setBV(bv) {   
  return function(dispatch){  
    console.log('BV:', bv);
     
    const _id = bv._id;

    axios.put('/bv/' + _id, bv)
    .then((responce) => {
      var bvs = responce.data;      
      dispatch({
        type:"SET_BV",
        payload: bvs
      })
    })
    .catch((err) => {
      console.log("\nSET responce ERROR\n", err);
      dispatch({
        type:"SET_BVS_REJECTED",
        payload:"there was an error while setting binary values"        
      })
    })
  }
}