import API_KEY from  '../../apiconfig.js';
import axios from 'axios';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export const FETCH_VIDEOS = "FETCH_VIDEOS";
export const SELECTED_VIDEO = "SELECTED_VIDEO";

export function videoSearch(term){
  var params = {
    part: 'snippet',
    key: API_KEY,
    q: term,
    type: 'video'
  };
  const request  = axios.get(ROOT_URL, { params: params });
  console.log('request',request);
    return {
      type: FETCH_VIDEOS,
      payload: request,
    };
}

export function videoSelect(selectedVideo){
  console.log("selected video",selectedVideo);
  return {
    type: SELECTED_VIDEO,
    selectedVideo
  };
}




// export const SET_COUNTER = 'SET_COUNTER';
// export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
// export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
//
// export function set(value) {
//   return {
//     type: SET_COUNTER,
//     payload: value
//   };
// }
//
// export function increment() {
//   return {
//     type: INCREMENT_COUNTER
//   };
// }
//
// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }
//
// export function incrementIfOdd() {
//   return (dispatch, getState) => {
//     const { counter } = getState();
//
//     if (counter % 2 === 0) {
//       return;
//     }
//
//     dispatch(increment());
//   };
// }
//
// export function incrementAsync(delay = 1000) {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
