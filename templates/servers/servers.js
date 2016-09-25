const defaultExpress = () => {
  return `const express = require('express');
const app = express();
var path = require('path');
var logger = require('morgan');
var pgp = require('pg-promise')();
var db = require('./pg.js');
app.use(logger('dev'));
app.use(express.static('server/static'));

app.get('/', function(req, res){
  res.sendFile(path.resolve('frontend/index.html'));
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;`
};

const express = () => {
  return `const express = require('express');
const app = express();
var path = require('path');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.static('server/static'));

app.get('/', function(req, res){
  res.sendFile(path.resolve('frontend/index.html'));
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;`
};

const pg = () => {
  return `// Proper way to initialize and share the Database object

// Loading and initializing the library:
var pgp = require('pg-promise')();

// Preparing the connection details:
var cn = 'postgres://username:password@host:port/database';

// Creating a new database instance from the connection details:
var db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;`
};

const Servers = {
  express: express,
  defaultExpress: defaultExpress,
  pg: pg
};

module.exports = Servers;
