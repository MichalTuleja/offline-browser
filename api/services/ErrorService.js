"use strict";

var ErrorService = {
    generalError: generalError,
    databaseError: databaseError
};

function generalError(res, err) {
    var msg = "General error \n" + err;
    console.log(msg);
    res.status(500).send(msg);
}

function databaseError(res, err) {
    var msg = "Issue with MySQL \n" + err;
    console.log(msg);
    res.status(500).send(msg);
}

module.exports = ErrorService;