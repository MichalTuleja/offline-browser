"use strict";

const express = require("express");

var controllers = require('require-all')({
    dirname     :  __dirname + '/controllers',
    filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

function init() {
    var router = express.Router();
    
    // Defaults
    // router.get("/", controllers.GenericController.defaultAction);
    router.get("/fetch", controllers.GenericController.fetchDocument);

    return router;
}

module.exports = init();