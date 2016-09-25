const pg = (name) => {
  return `var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);

// add query functions

module.exports = {
  //export queries
};`
};

const db = {
  pg: pg
};

module.exports = db;
