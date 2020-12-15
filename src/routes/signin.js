'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../auth/authenticate');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', authenticate, signIn);

async function signIn(req,res) {
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

    password = await bcrypt.hash(password, 10);
    res.status(200).json({username, password});
}

module.exports = router;