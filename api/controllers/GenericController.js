"use strict";

var HttpStatus = require('http-status-codes');
const DataService = require('../services/DataService');
// const ErrorService = require('../services/ErrorService');

var GenericController = {
  // defaultAction: unknownAction,
  fetchDocument: fetchDocument
};

function fetchDocument(req, res) {
  let url = req.params.url;
  return DataService.fetchDocument(url).then((content) => {
    if(content) {
      res.json({
        ctime: new Date(),
        meta: {
          title: '',
          tags: [],
          author: ''
        },
        content: content
      });
    }
    else {
      res.status(HttpStatus.NOT_FOUND);
      res.send('Error: not found');
    }
  });
}


module.exports = GenericController;