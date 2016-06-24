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
