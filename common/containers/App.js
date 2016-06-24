
import _ from 'lodash';
import React,  {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { videoSearch, videoSelect } from '../actions/index';

import SearchBar from '../components/search_bar';
import VideoList from '../components/video_list';
import VideoDetail from '../components/video_detail';



export default class App extends Component{

  render(){
    console.log("props",this.props)
    // prevents search from running immediately after each letter  - basically allows some typing before firing
    const videoSearch = _.debounce((term) => { this.props.videoSearch(term); }, 500);

    return (
      <div>
        <div className  = "header">
          <h1 className ="display-3">YouTube Search</h1>
        </div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video = {this.props.selectedVideo}/>
        <VideoList
          onVideoSelect= {this.props.videoSelect}
          videos = {this.props.videos}
        />
      </div>
    );
  }
}

// converts redux state to props for this component
function mapStateToProps({ videos, selectedVideo }) {
  return { videos, selectedVideo };
}
// tying in the action creators with dispatch
function mapDispatchToProps(dispatch){
  return bindActionCreators({videoSearch, videoSelect}, dispatch);
}
//connecting  - basically subscribing
export default connect(mapStateToProps, mapDispatchToProps)(App);
