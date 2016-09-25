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

const Servers = {
  express: express
};

module.exports = Servers
