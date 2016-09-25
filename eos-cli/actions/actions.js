// Action Helpers
const Start = require('./action_helpers/start.js');
const Generate = require('./action_helpers/generate.js');
const Remove = require('./action_helpers/remove.js');
const Help = require('./action_helpers/help.js');
// Other
const Util = require('../util/util.js');


// ACTIONS //

const start = (name) => {
  name = Util.snake(name);

  // Indented according to file structure
  Start.createDir(`${name}`);
    Start.createDir(`${name}/frontend`);
      Start.createStartFile(`index/index.html`, `${name}/frontend`);
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
    //creates .gitignore from command line to solve nvm issue
    Util.exec(`cd ${name} && echo 'node_modules/\nbundle.js\nbundle.js.map' >> .gitignore`);
    Generate.generateWebpack('express', name);
    Generate.generatePackageJSON(name);

    console.log('Installing front end dependencies. This could take a few minutes...');
    let install = Util.exec(`cd ${name}/frontend && npm install`);
    install.on('close', (code) => {
      console.log(`Done`);
      console.log(`IF YOU USE NVM RUN THE FOLLOWING COMMANDS:`);
      console.log(`cd ${name}`);
      console.log(`npm install`);
    });
    //default setting.  TODO: add if block for conditional with `--backend none`
    // Generate.generateService('express', 'server');
};

const generate = (action, name, ...args) => {
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
    Generate.append(name, 'middleware');
  }
  if (action === 'reducer' || cycle) {
    // Reducer
    Generate.generateFile(name, 'reducer', 'js', './frontend/reducers/');
    Generate.setName(name, 'reducer');
    Generate.append(name, 'reducer');
  }
  if (action === 'api_util' || cycle) {
    // Util
    Generate.generateFile(name, 'api_util', 'js', './frontend/util/');
    Generate.setName(name, 'api_util');
  }
  if (action === 'service') {
    // Service
    Generate.generateService(name, args[0]);
  }
};

const remove = (action, name) => {
  let cycle = (action === 'cycle');
  if (action === 'component' || cycle) {
    // Component
    Remove.folder(`frontend/components/${Util.snake(name)}`);
  }
  if (action === 'actions' || cycle) {
    // Actions
    Remove.file(`./frontend/actions/${Util.snake(name)}_actions.js`);
  }
  if (action === 'middleware' || cycle) {
    // Middleware
    Remove.file(`./frontend/middleware/${Util.snake(name)}_middleware.js`);
    Remove.append(name, 'middleware', `frontend/middleware/master_middleware.js`);
  }
  if (action === 'reducer' || cycle) {
    // Reducer
    Remove.file(`./frontend/reducers/${Util.snake(name)}_reducer.js`);
    Remove.append(name, 'reducer', `frontend/reducers/root_reducer.js`);
  }
  if (action === 'api_util' || cycle) {
    // Util
    Remove.file(`./frontend/util/${Util.snake(name)}_api_util.js`);
  }
};

const server = () => {
  let run = Util.exec('node server/server.js');
  run.stdout.on('data', (data) => console.log(data));
};


const help = () => {
  Help.display();
};

// OPTION ACTIONS //

const backend = (name, type) => {
  name = name || 'server';
  type = type || 'express';
  name = Util.snake(name);
  Util.exec(`cd ${name}`);
  Generate.generateService(type, 'server', name, true);
};

//WEBPACK

const webpack = (watch) => {
  Util.exec(`cd frontend && webpack --${watch}`).stdout.on('data', function (data) {
    console.log(data);
  });
};

//DB

const db = (action) => {
  if (action === 'create'){
    let name;
    Util.exec('pwd').stdout.on('data', function(data) {
      name = data.split('/').pop();
      console.log('Creating database ' + name.trim() + '_development');
    });
    setTimeout(() => Util.exec(`cd server && psql -f ${name.trim()}_db.sql`)
      .stdout.on('data', (data)=> console.log(data)), 250);
  } else console.log('Command not found. Did you mean db create?');
};


// Export

let actions = {
  start: start,
  backend: backend,
  generate: generate,
  remove: remove,
  server: server,
  help: help,
  webpack: webpack,
  db: db
};

module.exports = actions;
