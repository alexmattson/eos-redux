const Start = require('./start.js');
const Generate = require('./generate.js');
const Util = require('../util/util.js');

// ACTIONS //

const start = (name) => {
  name = Util.snake(name);

  Start.createDir(`${name}`);
  Start.createDir(`${name}/frontend`);
  Start.createDir(`actions`, `${name}/frontend/`);
  Start.createDir(`components`, `${name}/frontend/`);
    Start.createStartFile(`root.jsx`, `${name}/frontend/components/`);
  Start.createDir(`middleware`, `${name}/frontend/`);
    Start.createStartFile(`master_middleware.js`, `${name}/frontend/middleware/`);
  Start.createDir(`reducers`, `${name}/frontend/`);
    Start.createStartFile(`root_reducer.js`, `${name}/frontend/reducers/`);
  Start.createDir(`store`, `${name}/frontend/`);
    Start.createStartFile(`store.js`, `${name}/frontend/store/`);
  Start.createDir(`util`, `${name}/frontend/`);
  Start.createStartFile(`index.jsx`, `${name}/frontend/`);
  Start.createStartFile(`../webpack.config.js`, `${name}/`);
  Start.createStartFile(`../package.json`, `${name}/`);

  console.log('Installing dependencies. This Could take a few minutes.');
  Util.exec(`cd ${name} && npm install`);
};

const generate = (action, name) => {
  let cycle = (action === 'cycle');
  if (action === 'component' || cycle) {
    // Component
    Generate.generateComponent(name);
    Generate.setComponentNames(name, true);
  }
  if (action === 'actions' || cycle) {
    // Actions
    Generate.generateFile(name, 'actions', 'js', './frontend/actions/');
    Generate.setName(name, 'actions');
  }
  if (action === 'middleware' || cycle) {
    // Middleware
    Generate.generateFile(name, 'middleware', 'js', './frontend/middleware/');
    Generate.setName(name, 'middleware');
  }
  if (action === 'reducer' || cycle) {
    // Reducer
    Generate.generateFile(name, 'reducer', 'js', './frontend/reducers/');
    Generate.setName(name, 'reducer');
  }
  if (action === 'api_util' || cycle) {
    // Util
    Generate.generateFile(name, 'api_util', 'js', './frontend/util/');
    Generate.setName(name, 'api_util');
  }
};

// Export

let actions = {
  start: start,
  generate: generate
};

module.exports = actions;
