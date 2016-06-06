/*eslint-disable no-var,no-unused-vars*/
var Promise = require('bluebird'); // Promise polyfill for IE11

import { bootstrap } from 'aurelia-bootstrapper-webpack';

import 'bootstrap';

import '../node_modules/bootstrap/scss/bootstrap-flex.scss';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../styles/styles.scss';

bootstrap(function(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(() => aurelia.setRoot('app', document.body));
});
