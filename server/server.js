/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchCounter } from '../common/api/counter';
import Axios from 'axios';

const app = new Express();
const port = 3000;

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    //Read the counter from the request, if provided

    // const params = qs.parse(req.query);
    //

    // const data = Axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&type=video&key=AIzaSyCu8ySDCn0PaFXTAv70TdljI6mtPDlBfjk");
    // console.log('data', data);
    // const videos  = data.items;
    // console.log("server videos", videos)
    const selectedVideo =
      {
      kind: "youtube#searchResult",
      etag: "'5g01s4-wS2b4VpScndqCYc5Y-8k/MnJ0eyS5rPdhmO-Q8dxraaCXdj8'",
      id: {
      kind: "youtube#video",
      videoId: "Eg86emJjbwk"
      },
      snippet: {
      publishedAt: "2016-06-21T16:30:00.000Z",
      channelId: "UCPDis9pjXuqyI7RYLJ-TTSA",
      title: "Dummy Dogs || 'Dog Fails' By FailArmy",
      description: "There's nothing funnier than seeing a man's best friend fail. They're always there for us, they love us, but sometimes they're not the smartest. Here are some of ...",
      thumbnails: {
      default: {
      url: "https://i.ytimg.com/vi/Eg86emJjbwk/default.jpg",
      width: 120,
      height: 90
      },
      medium: {
      url: "https://i.ytimg.com/vi/Eg86emJjbwk/mqdefault.jpg",
      width: 320,
      height: 180
      },
      high: {
      url: "https://i.ytimg.com/vi/Eg86emJjbwk/hqdefault.jpg",
      width: 480,
      height: 360
      }
      },
      channelTitle: "FailArmy",
      liveBroadcastContent: "none"
      }
      };
    const videos = [
      {
      kind: "youtube#searchResult",
      etag: "'5g01s4-wS2b4VpScndqCYc5Y-8k/MnJ0eyS5rPdhmO-Q8dxraaCXdj8'",
      id: {
      kind: "youtube#video",
      videoId: "Eg86emJjbwk"
      },
      snippet: {
      publishedAt: "2016-06-21T16:30:00.000Z",
      channelId: "UCPDis9pjXuqyI7RYLJ-TTSA",
      title: "Dummy Dogs || 'Dog Fails' By FailArmy",
      description: "There's nothing funnier than seeing a man's best friend fail. They're always there for us, they love us, but sometimes they're not the smartest. Here are some of ...",
      thumbnails: {
      default: {
      url: "https://i.ytimg.com/vi/Eg86emJjbwk/default.jpg",
      width: 120,
      height: 90
      },
      medium: {
      url: "https://i.ytimg.com/vi/Eg86emJjbwk/mqdefault.jpg",
      width: 320,
      height: 180
      },
      high: {
      url: "https://i.ytimg.com/vi/Eg86emJjbwk/hqdefault.jpg",
      width: 480,
      height: 360
      }
      },
      channelTitle: "FailArmy",
      liveBroadcastContent: "none"
      }
      }];
    // Compile an initial state
    const preloadedState = { videos, selectedVideo };

    // Create a new Redux store instance
    const store = configureStore(preloadedState);

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();
    console.log("finalstate",finalState)

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
  });
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>

        <link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.css">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
