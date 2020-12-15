'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const cors = require('cors');
const notFoundError = require('./error-handlers/404');
const invalidLogin = require('./error-handlers/403');
//const internalServerError = require('./error-handlers/500');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

//use cors so we can use the netlify app
app.use(cors());

//Deal with all routes
app.use(signinRouter);
app.use(signupRouter);

//error handling
//app.use('*', notFoundError);
app.use(invalidLogin);
//app.use(internalServerError);

function start(port, mongoDB) {
    if (port) {
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                app.listen(port, () => console.log('Server is up on port ', port));
            })
            .catch(error => console.error('Could not start server', error.message));
    }
    else throw new Error('no port provided');
}

module.exports = {
    server: app,
    start: start
}