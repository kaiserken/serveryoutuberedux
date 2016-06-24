import {SELECTED_VIDEO} from '../actions/index';

export default function(state=null, action){


  switch(action.type){
    case SELECTED_VIDEO:
      return action.selectedVideo;
  }
  return state;
}
