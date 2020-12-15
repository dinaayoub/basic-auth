'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

//this is like an event listener. every time we use "save", run this logic. 
usersSchema.pre('save', async function() {
    //checks to see if the password has changed
    //this refers to the new user object we're running this on
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

//this method will only run on the mdoel itself, not the object instance
//you can User.authenticateBasic vs cannot do new User().authenticateBasic
usersSchema.statics.authenticateBasic = async function (username, password) {
    //this refers to the mongoose db? 
    const user = await this.findOne({username});
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { 
        return user;
    }
    //won't this trigger a 500 error instead of a 403 error? is there some way we can do a 403 instead in here if we don't have the res?
    throw new Error('Invalid User');
}

module.exports = mongoose.model('users',usersSchema);