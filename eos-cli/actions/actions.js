const Start = require('./start.js');
const Generate = require('./generate.js');

// ACTIONS //

const start = () => {
  Start.createDir('frontend');
  Start.createDir('actions', 'frontend/');
  Start.createDir('components', 'frontend/');
    Start.createStartFile('root.jsx', 'frontend/components/');
  Start.createDir('middleware', 'frontend/');
    Start.createStartFile('master_middleware.js', 'frontend/middleware/');
  Start.createDir('reducers', 'frontend/');
    Start.createStartFile('root_reducer.js', 'frontend/reducers/');
  Start.createDir('store', 'frontend/');
    Start.createStartFile('store.js', 'frontend/store/');
  Start.createDir('util', 'frontend/');
  Start.createStartFile('index.jsx', 'frontend/');
  Start.createStartFile('webpack.config.js', './');
};

const generate = (name) => {
  // Component
  Generate.generateComponent(name);
  Generate.setComponentNames(name, true);
  // Actions
  Generate.generateFile(name, 'actions', 'js', 'frontend/actions/');
  Generate.setName(name, 'actions');
  // Middleware
  Generate.generateFile(name, 'middleware', 'js', 'frontend/middleware/');
  Generate.setName(name, 'middleware');
  // Reducer
  Generate.generateFile(name, 'reducer', 'js', 'frontend/reducers/');
  Generate.setName(name, 'reducer');
  // Util
  Generate.generateFile(name, 'api_util', 'js', 'frontend/util/');
  Generate.setName(name, 'api_util');
};

// Export

let actions = {
  start: start,
  generate: generate
};

module.exports = actions;
