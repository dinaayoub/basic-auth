'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const authenticate = require('../src/auth/authenticate');
const supergoose = require('@code-fellows/supergoose');
const { it } = require('@jest/globals');
const agent = supergoose(server);

describe('Web Server', () => {
    var req = {
        method: "POST",
        route: "/signin",
        headers: {
            authorization: "Basic Zm9vOmJhcg=="
        },
        body: {
            username: "foo",
            password: "bar"
        }
    };
    var res = {};
    var next = jest.fn();

    it('Should sign up a valid user', async () => {
        const newUser = { "username": "foo", "password": "bar" };
        let response = await agent.post('/signup').send(newUser);
        expect(response.status).toEqual(200);

    });

    it('Should not sign up an invalid user', async () => {
        const newUser = { "username": "foo", "password": "" };
        let response = await agent.post('/signup').send(newUser);
        expect(response.status).toEqual(403);

    });

    it('Should sign in a valid user', async () => {

        let response = await agent.post('/signin').auth("foo", "bar");
        expect(response.status).toEqual(200);
    })

    it('Should not sign in an invalid user', async () => {

        let response = await agent.post('/signin').auth("foo", "bars");
        console.log(response.body)
        expect(response.body.statusCode).toEqual(403);
        //TODO: Figure out how to consume the error here. 
    })

});