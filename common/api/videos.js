import Axios from 'axios';

export function fetchVideos(callback) {
  Axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&type=video&key=AIzaSyCu8ySDCn0PaFXTAv70TdljI6mtPDlBfjk")
  .then(function(response) {
    console.log(response);
    callback(response.data.items);
  })
  .catch(function (error) {
    console.log(error);
  });
}
