'use strict';

function internalServerError(error, req, res, next) {
    console.error(error);
    const errorObject = {
        statusCode: 500,
        message: 'Internal Server Error - ' + (error.message ? error.message : error)
    }
    res.status(404).json(errorObject);
}

module.exports = internalServerError;