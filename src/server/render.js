import DocumentTitle from 'react-document-title';
import Html from './html.react';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';
import config from './config/environment';
import initialState from './initialstate';
import routes from '../client/routes';
import {state} from '../client/state';

export default function render(req, res, locale) {
  const url = req.originalUrl;
  return loadData(url, locale)
    .then((appState) => renderPage(res, appState, url));
}

function loadData(url, locale) {
  // TODO: Preload and merge user specific state.
  const appState = initialState;
  return new Promise((resolve, reject) => {
    resolve(appState);
  });
}

// TODO: Refactor.
function renderPage(res, appState, url) {
  return new Promise((resolve, reject) => {
    const router = Router.create({
      routes,
      location: url,
      onError: reject,
      onAbort: (abortReason) => {
        if (abortReason.constructor.name === 'Redirect') {
          const {to, params, query} = abortReason;
          const path = router.makePath(to, params, query);
          res.redirect(path);
          resolve();
          return;
        }
        reject(abortReason);
      }
    });
    router.run((Handler, routerState) => {
      state.load(appState);
      const html = getPageHtml(Handler, appState);
      const notFound = routerState.routes.some(route => route.name === 'not-found');
      const status = notFound ? 404 : 200;
      res.status(status).send(html);
      resolve();
    });
  });
}

function getPageHtml(Handler, appState) {
  const appHtml =
    `<div id="app">${React.renderToString(<Handler />)}</div>`;

  const appScriptSrc = config.isProduction
    ? config.aws.url + config.version + '/app.js'
    : '//localhost:8888/build/app.js';

  let scriptHtml =
      `<script>
      (function() {
        window._appState = ${JSON.stringify(appState)};
        var app = document.createElement('script'); app.type = 'text/javascript'; app.async = true;
        var src = '${appScriptSrc}';
        // IE<11 and Safari need Intl polyfill.
        if (!window.Intl) src = src.replace('.js', 'intl.js');
        app.src = src;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(app, s);
      })();
    </script>`;

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      isProduction={config.isProduction}
      version={config.version}
      cdnHost={config.aws.url}
    />
  );
}
