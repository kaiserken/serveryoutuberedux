/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';
//import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchVideos } from '../common/api/videos';

const app = new Express();
const port = 3000;

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // search term for initial data load of videos
  const term  = "coolest houses";
  fetchVideos(term, VideoResult => {

    const videos  = VideoResult;
    // set value of selectedVideo to first video on initial render
    const selectedVideo = videos[0];
    // Compile an initial state
    // You can verify that data is loaded on server by changing preloadedState to an empty object
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
// notice the whole return below is a template string  - hence the ${} for variables injected
function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux You Tube</title>
        <link rel="stylesheet" href="style/style.css">
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
