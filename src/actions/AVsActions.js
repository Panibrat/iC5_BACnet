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

export function setAV(av) {   
  return function(dispatch){  
    console.log('AV:', av);
     
    const _id = av._id;

    axios.put('/av/' + _id, av)
    .then((responce) => {
      var avs = responce.data;      
      dispatch({
        type:"SET_AV",
        payload: avs
      })
    })
    .catch((err) => {
      console.log("\nAV SET responce ERROR\n", err);
      dispatch({
        type:"SET_AVS_REJECTED",
        payload:"there was an error while setting analog values"        
      })
    })
  }
}
export function postAV(av) {   
  return function(dispatch){  
    console.log('postAV:', av);     

  }
}