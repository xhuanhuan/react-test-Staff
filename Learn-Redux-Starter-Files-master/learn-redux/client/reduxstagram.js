import React from 'react';
import {render} from 'react-dom';
//import css
import css from './styles/style.styl';
//import components
import App from './Components/App';
import PhotoGrid from './Components/PhotoGrid';
import Single from './Components/Single';
//import react router deps
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import {Provider} from 'react-redux'
import store,{history} from './store'

// import Raven from 'raven-js';
// import { sentry_url,logException } from './data/config';
//
// Raven.config(sentry_url,{
//   tags:{
//     git_commit:'asdfas9d08f',
//     userLevel:'editor'
//   }
// }).install();
// //console.log(window.user.asca);
// Raven.captureMessage('im just learning redux');
// Raven.showReportDialog();

const router=(
  <Provider store={store}>
  <Router history={history}>
  <Route path="/" component={ App }>
  <IndexRoute component={PhotoGrid}></IndexRoute>
  <Route path="/view/:postId" component={Single}></Route>
  </Route>
  </Router>
  </Provider>
)
render(router,document.getElementById('root'));
