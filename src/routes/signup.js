'use strict'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');
const userSchema = require('../mongo/userSchema');
const Users = mongoose.model('users', userSchema);

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
async function signUp(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new Users(req.body);
        //console.log(user);
        const record = await user.save(req.body);
        res.status(200).json(record);
    } catch (error) {
        res.status(403).send("Error Creating User");
    }
}
module.exports = signUp;