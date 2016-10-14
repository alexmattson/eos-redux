const express = () => {
  return `const express = require('express');
const app = express();
const Routes = require('./routes');
const Routing = require('eos-redux/utils/routing');
const Errors = require('/eos-redux/utils/errors');
const Controller = require('./controller');
const path = require('path');
const logger = require('morgan');

const processRequest = function(req){
  let response;
  let action;
  let status;
  const params = Routing.getParams(Routes[req.method], req.path);
  if(params){
    action = Routes[req.method][params.path];
    response = Controller[action](params.params);
    status = 200;
  } else {
    response = Errors.code(404);
    status = 404;
  }
  return { response: response, status: status };
}

app.use(logger('dev'));
app.use(express.static('server/static'));

app.get(/\/*/, function(req, res){
  const responseParams = processRequest(req);
  res.status(responseParams.status).send(responseParams.response);
});

app.post(/\/*/, function(req, res){
  const responseParams = processRequest(req);
  res.status(responseParams.status).send(responseParams.response);
});

app.put(/\/*/, function(req, res){
  const responseParams = processRequest(req);
  res.status(responseParams.status).send(responseParams.response);
});

app.patch(/\/*/, function(req, res){
  const responseParams = processRequest(req);
  res.status(responseParams.status).send(responseParams.response);
});

app.delete(/\/*/, function(req, res){
  const responseParams = processRequest(req);
  res.status(responseParams.status).send(responseParams.response);
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
import requests
from flask import Flask, request
import routes
import controller

app = Flask(__name__)

@app.route('/')
def root():
    action = routes.GET['/']
    response = getattr(controller, action)()
    return response

@app.route('/<path:path>', methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'])
def send_to_router(path):
    action = getattr(routes, request.method)['/' + path]
    if not action:
        content = getattr(controller, 'error')(404)
        return content, 404
    response = getattr(controller, action)()
    return response

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
