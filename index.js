#! /usr/bin/env node

const exec = require('child_process').exec;
const chalk = require('chalk');
const snake = require('to-snake-case');

// HELPERS //
let command = '';

//// Start Helpers ////

const createDir = (dir, path) => {
  path = path ? path : '';
  command = `mkdir ${path}${dir}`;
  exec(command);
  console.log(chalk.green('created'), `${path}${dir}/`);
};

const createStartFile = (file, dir, destinationPath) => {
  let currentPath = `node_modules/eos-redux/templates/${dir}/${file}`
  command = `cp ${currentPath} ${destinationPath}`;
  exec(command);
  console.log(chalk.blue('created'), `${destinationPath}${file}`);
};

//// Generate Helpers ////

const generateFile = (name, file, type, destinationPath) => {
  let currentPath = `node_modules/eos-redux/templates/cycle/template_${file}.${type}`
  // let currentPath = `templates/cycle/template_${file}.${type}`;
  let fileName = `${snake(name)}_${file}.${type}`;
  command = `cp ${currentPath} ${destinationPath}${fileName}`;
  exec(command);
  setName(name, file);
  console.log(chalk.blue('created'), `${destinationPath}${fileName}`);
};

const setName = (name, file) => {
  let find_file = `find . -type f -name "*${snake(name)}_${file}*"`

  let uppercase = `${find_file} -exec sed -i "" 's/TEMPLATE/${snake(name).toUpperCase()}/g' {} +`
  exec(uppercase);
  let lowercase = `${find_file} -exec sed -i "" 's/template/${snake(name).toLowerCase()}/g' {} +`
  exec(lowercase);
  let kneelingcamelize = `${find_file} -exec sed -i "" 's/temPlate/${kneelingCamelize(name)}/g' {} +`
  exec(kneelingcamelize);
  let camelize = `${find_file} -exec sed -i "" 's/Template/${Camelize(name)}/g' {} +`
  exec(camelize);
}

const generateComponent = (name) => {
  createDir(snake(name), 'frontend/components/');

  let currentPath = `templates/cycle/template.jsx`;
  let destinationPath = `frontend/components/${snake(name)}/`
  command = `cp ${currentPath} ${destinationPath}${snake(name)}.jsx`;
  exec(command);
  setComponentNames(name, false);

  generateFile(name,
               'container',
               'jsx',
               `frontend/components/${snake(name)}/`
              );
  setComponentNames(name, true);
}

const setComponentNames = (name, container) => {
  let find_file;
  if (container) {
    find_file = `find . -type f -name "*${snake(name)}_container*"`
  } else {
    find_file = `find . -type f -name "*${snake(name)}.jsx*"`
  }

  let uppercase = `${find_file} -exec sed -i "" 's/TEMPLATE/${snake(name).toUpperCase()}/g' {} +`
  exec(uppercase);
  let lowercase = `${find_file} -exec sed -i "" 's/template/${snake(name).toLowerCase()}/g' {} +`
  exec(lowercase);
  let kneelingcamelize = `${find_file} -exec sed -i "" 's/temPlate/${kneelingCamelize(name)}/g' {} +`
  exec(kneelingcamelize);
  let camelize = `${find_file} -exec sed -i "" 's/Template/${Camelize(name)}/g' {} +`
  exec(camelize);
}

// ACTIONS //

const start = () => {
  createDir('frontend');
  createDir('actions', 'frontend/');
  createDir('components', 'frontend/');
    createStartFile('root.jsx', 'frontend/components/');
  createDir('middleware', 'frontend/');
    createStartFile('master_middleware.js', 'frontend/middleware/');
  createDir('reducers', 'frontend/');
    createStartFile('root_reducer.js', 'frontend/reducers/');
  createDir('store', 'frontend/');
    createStartFile('store.js', 'frontend/store/');
  createDir('util', 'frontend/');
  createStartFile('index.jsx', 'frontend/');
  createStartFile('webpack.config.js', './');
};

const generate = (name) => {
  // Component
  generateComponent(name);
  setComponentNames(name, true);
  // Actions
  generateFile(name, 'actions', 'js', 'frontend/actions/');
  setName(name, 'actions');
  // Middleware
  generateFile(name, 'middleware', 'js', 'frontend/middleware/');
  setName(name, 'middleware');
  // Reducer
  generateFile(name, 'reducer', 'js', 'frontend/reducer/');
  setName(name, 'reducer');
  // Util
  generateFile(name, 'api_util', 'js', 'frontend/util/');
  setName(name, 'api_util');
}


// PROGRAM //

const program = require('commander');

program
  .version('0.0.1')
  .arguments('<cmd> [env]')
  .action(function (cmd, env) {
    // Start
    if (['start', 's'].includes(cmd)) {
      start();
    }
    // Generate
    else if (['generate', 'g'].includes(cmd)) {
      generate(env)
    }
  });

program.parse(process.argv);


// MISC //

function kneelingCamelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function Camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter) {
    return letter.toUpperCase();
  }).replace(/\s+/g, '');
}
