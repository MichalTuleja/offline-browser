"use strict";

var DataService = {
    fetchDocument: fetchDocument
};

function fetchDocument(url) {
  return new Promise((resolve, reject) => {
    resolve('<html>hello!</html>');
  });
}

module.exports = DataService;