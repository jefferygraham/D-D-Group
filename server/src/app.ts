import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';

import indexRouter from './routes/indexRouter';
import publicDir from './constant';

import dotenv from 'dotenv';

dotenv.config();

var app = express();

app.use(cors({ origin: process.env.CLIENT, credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
app.use(
  session({
    secret: 'whatever',
    store: new (MemoryStore(session))({ checkPeriod: 86400000 }),
    cookie: {},
    resave: false,
    saveUninitialized: false,
  })
);

/*
 Set routers: First argument takes a 'route' string. 
 The route string is the string of characters after our domain name that specifies what resources we are looking for.
 Basically the URN, but more general. (not a full urn, necessarily.)
 The second parameter is a "router". This is an object that will handle a request for me.
*/
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err: any, req: any, res: any, next: Function) {
  // Send error file
  res.status(err.status || 500);
  res.sendFile('/error.html', { root: publicDir });
});

module.exports = app;
