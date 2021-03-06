# LAB - Class 06

## Project: Basic Auth Server

### Author: Dina Ayoub

### Links and Resources

- [ci/cd](https://github.com/dinaayoub/basic-auth/actions) (GitHub Actions)
- [back-end server url on heroku](https://dina-basic-api-server.herokuapp.com/)

### Setup

#### `.env` requirements (where applicable)

- `PORT` - Port Number, 3000 for us
- `MONGOOSE_URI` - the uri including username and password to your mongo db

#### How to initialize/run your application (where applicable)

- `npm start`

#### How to use this api

- POST: /signup accepts a json body or a form with username and password fields and creates them in the db
- POST /signin accepts a username and password in basic auth headers (url encoded password)

#### Tests

- `npm test`
- Tests will check:
  - valid user can sign up
  - invalid user (no username or pass) cannot sign up
  - valid user can sign in
  - invalid user (wrong username or pass) cannot sign in

#### UML

![UML Diagram](assets/auth-uml.png)