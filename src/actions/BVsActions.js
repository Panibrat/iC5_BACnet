"use strict"
import axios from 'axios';
import socketIOClient from "socket.io-client";
const socket = socketIOClient();

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

//postBV, getBVs, deleteBVs
export function postBV(bv) {   
  return function(dispatch){  
    console.log('postBV:', bv);
      axios.post('/postbv', bv)
          .then((responce) => {
              var posted = responce.data;
              console.log('postedBV response:', posted);
              socket.emit('pointsUpdate');
              dispatch({
                  type:"POST_BV",
                  payload: posted
              })
          })
          .catch((err) => {
              console.log("\nBV POST responce ERROR\n", err);
              dispatch({
                  type:"POST_BVS_REJECTED",
                  payload:"there was an error while adding binary values"
              })
          })

  }
}

export function deleteBVs(bv) {
  console.log('DELETE:');
  return function (dispatch) {
    axios.delete("/bv/" + bv.title)
        .then((response) => {
          //console.log('response', response);  
          socket.emit('pointsUpdate');        
          dispatch({
            type: "DELETE_BV",
            payload: bv
          })
        })
        .catch((err) => {
          //console.log('ERR', err);
            dispatch({
                type: "DELETE_BV_REJECTED",
                payload: err
            })
        })
  }
}