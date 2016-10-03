const express = () => {
  return `const [GET, POST, PUT, PATCH, DELETE] = [{}, {}, {}, {}, {}];

GET['/'] = 'root'

//to add routes:
//<METHOD>[<route>] = <controller action>

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
  return `from collections import defaultdict
GET = defaultdict(lambda: None)
POST = defaultdict(lambda: None)
PATCH_PUT = defaultdict(lambda: None)
DELETE = defaultdict(lambda: None)

GET['/'] = 'root'

# To add routes:
# <METHOD>[<route>] = <controller action>`
};

const Routers = {
  express: express,
  flask: flask
};

module.exports = Routers;
