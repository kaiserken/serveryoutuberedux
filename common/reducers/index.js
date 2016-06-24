
import { combineReducers } from 'redux';
import VideoReducer from './reducer_videos';
import SelectReducer from './reducer_selectedvideo'


const rootReducer = combineReducers({
  videos: VideoReducer,
  selectedVideo: SelectReducer
});

export default rootReducer;
