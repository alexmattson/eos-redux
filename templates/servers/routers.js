const express = () => {
  return `const GET = {
  '/': 'root'
  //<route>: <controller action>
};

const POST = {
  //<route>: <controller action>
};

const PUT = {
  //<route>: <controller action>
};

const PATCH = {
  //<route>: <controller action>
};

const DELETE = {
  //<route>: <controller action>
};

const Routes = {
  GET: GET,
  POST: POST,
  PUT: PUT,
  PATCH: PATCH,
  DELETE: DELETE
};

module.exports = Routes;`
};

const flask = () => {
  //TODO: default router for flask
};

const Routers = {
  express: express,
  flask: flask
};

module.exports = Routers;
