const express = () => {
  return `const express = require('express');
const app = express();
const Routes = require('./routes');
const Controller = require('./controller');
const path = require('path');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.static('server/static'));

app.get(/\\/*/, function(req, res){
  const action = Routes.GET[req.path];
  if(!action){
    res.status(404).send('ERROR 404: Route Not Found');
  } else {
    response = Controller[action]();
    res.send(response);
  }
});

app.post(/\\/*/, function(req, res){
  const action = Routes.POST[req.path];
  if(!action){
    res.status(404).send('ERROR 404: Route Not Found');
  } else {
    response = Controller[action]();
    res.send(response);
  }
});

app.put(/\\/*/, function(req, res){
  const action = Routes.PUT[req.path];
  if(!action){
    res.status(404).send('ERROR 404: Route Not Found');
  } else {
    response = Controller[action]();
    res.send(response);
  }
});

app.patch(/\\/*/, function(req, res){
  const action = Routes.PATCH[req.path];
  if(!action){
    res.status(404).send('ERROR 404: Route Not Found');
  } else {
    response = Controller[action]();
    res.send(response);
  }
});

app.delete(/\\/*/, function(req, res){
  const action = Routes.DELETE[req.path];
  if(!action){
    res.status(404).send('ERROR 404: Route Not Found');
  } else {
    response = Controller[action]();
    res.send(response);
  }
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;`
};

const flask = () => {
  return `import sys
from flask import Flask, url_for

app = Flask(__name__)

@app.route('/hello')
def say_hello():
    return 'Flask server 2 says hello!'

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_file(path):
    mimetype = ''
    if path.split('.')[1] == 'css':
        mimetype = 'text/css'
    if path.split('.')[1] == 'js':
        mimetype = 'application/javascript'
    return app.send_static_file(path), 200, {'Content-Type': mimetype}

if __name__  == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'development':
        app.run(port=int(8003))
    else:
        app.run()`
};

const Servers = {
  express: express,
  flask: flask
};

module.exports = Servers;
