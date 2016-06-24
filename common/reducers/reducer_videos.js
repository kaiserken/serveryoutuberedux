import {FETCH_VIDEOS} from '../actions/index';

export default function(state=[], action){
  console.log("action.payload", action.payload)

  switch(action.type){
    case FETCH_VIDEOS:
      //returns a new array with added videos each time
      //could just return action.payload.data.items if we always only wanted 5 videos
      return action.payload.data.items.concat(state);
  }

  return state;
}
