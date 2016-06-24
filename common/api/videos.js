import Axios from 'axios';
import API_KEY from "../../apiconfig"
//make the request to google api for initial list of videos search term set on server
export function fetchVideos(term, callback) {
  Axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}&type=video&key=${API_KEY}`)
  .then(function(response) {
    console.log(response);
    callback(response.data.items);
  })
  .catch(function (error) {
    console.log(error);
  });
}
