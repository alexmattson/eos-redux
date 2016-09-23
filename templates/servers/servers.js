const express = () => {
  return `const express = require('express');
const app = express();

app.get('/', function(req, res){
  console.log('Hello.  Node Server is running');
  res.sendFile(__dirname + '/static/index.html');
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
