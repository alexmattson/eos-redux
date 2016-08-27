#! /usr/bin/env node

const exec = require('child_process').exec;
const chalk = require('chalk');

// HELPERS //

let command = '';

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

const generateFile = (name, file, type, destinationPath) => {
  // let currentPath = `node_modules/eos-redux/templates/cycle/template_${file}`
  let currentPath = `templates/cycle/template_${file}.${type}`
  let fileName = `${name}_${file}.${type}`
  command = `cp ${currentPath} ${destinationPath}${fileName}`;
  exec(command);
  setName(name, file);
  console.log(chalk.blue('created'), `${destinationPath}${fileName}`);
};

const setName = (name, file) => {
  let uppercase = `find . -type f -name "*${name}_${file}*" -exec sed -i "" 's/TEMPLATE/${name.toUpperCase()}/g' {} +`
  exec(uppercase);
  let lowercase = `find . -type f -name "*${name}_${file}*" -exec sed -i "" 's/template/${name.toLowerCase()}/g' {} +`
  exec(lowercase);
  let kneelingcamelize = `find . -type f -name "*${name}_${file}*" -exec sed -i "" 's/temPlate/${kneelingCamelize(name)}/g' {} +`
  exec(kneelingcamelize);
  let camelize = `find . -type f -name "*${name}_${file}*" -exec sed -i "" 's/Template/${Camelize(name)}/g' {} +`
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
  // Actions
  generateFile(name, 'actions', 'js', 'frontend/actions/');
  setName(name, 'actions');
  // Middleware
  generateFile(name, 'middleware', 'js', 'frontend/middleware/');
  setName(name, 'actions');
  // Reducer
  // Util

  // Component
  // createDir('reducers', 'frontend/');
  // generateComponent(name, 'component', 'js', 'frontend/actions/');
  // setName(name, 'actions');
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
