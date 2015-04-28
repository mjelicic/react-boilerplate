/*eslint-disable no-console */

import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//var errorHandler = require('errorhandler');
//var expressValidator = require('./expressValidator');

export default function (app) {
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
};
