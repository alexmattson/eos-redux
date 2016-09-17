// Action Helpers
const Start = require('./action_helpers/start.js');
const Generate = require('./action_helpers/generate.js');
const Help = require('./action_helpers/help.js');
// Other
const Util = require('../util/util.js');

// ACTIONS //

const start = (name) => {
  name = Util.snake(name);

  // Indented according to file structure
  Start.createServer(name, function(){
    Start.createStartFile(`index.ejs`, `${name}/views/`);
    Start.createDir(`${name}/frontend`);
    Start.createDir(`actions`, `${name}/frontend/`);
    Start.createDir(`components`, `${name}/frontend/`);
    Start.createStartFile(`root.jsx`, `${name}/frontend/components/`);
    Start.createStartFile(`app.jsx`, `${name}/frontend/components/`);
    Start.createStartFile(`router.jsx`, `${name}/frontend/components/`);
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
    Start.createStartFile(`../app.js`, `${name}/`);
    Start.installDependencies(name);
  });

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

const server = () => {
  let run = Util.exec('DEBUG=myapp:* npm start');
  run.stdout.on('data', (data)=>console.log(data));
};

const help = () => {
  Help.display();
};

// Export

let actions = {
  start: start,
  generate: generate,
  server: server,
  help: help
};

module.exports = actions;
