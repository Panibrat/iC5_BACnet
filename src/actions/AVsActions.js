"use strict"
import axios from 'axios';

export function getAVs() {
  return function(dispatch){
    axios.get('/av')
    .then((responce) => {
      var avs = responce.data;
      //console.log("\nGET responce\n", books);
      dispatch({
        type:"GET_AVS",
        payload: avs
      })
    })
    .catch((err) => {
      console.log("\nGET responce ERROR\n", err);
      dispatch({
        type:"GET_AVS_REJECTED",
        payload:"there was an error while getting analog values"
        //payload:err
      })
    })
  }
}

export function getBVs() {
  return function(dispatch){
    axios.get('/bv')
    .then((responce) => {
      var bvs = responce.data;
      //console.log("\nGET responce\n", books);
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
        //payload:err
      })
    })
  }
}
