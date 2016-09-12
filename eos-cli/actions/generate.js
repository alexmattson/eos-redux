/// Util
const exec = require('child_process').exec;
const chalk = require('chalk');
const snake = require('to-snake-case');

const Start = require('./start.js');

//// Generate Helpers ////
let command = '';

const generateFile = (name, file, type, destinationPath) => {
  let currentPath = `/usr/local/lib/node_modules/eos-redux/templates/cycle/template_${file}.${type}`;
  // let currentPath = `node_modules/eos-redux/templates/cycle/template_${file}.${type}`
  // let currentPath = `templates/cycle/template_${file}.${type}`;
  let fileName = `${snake(name)}_${file}.${type}`;
  command = `cp ${currentPath} ${destinationPath}${fileName}`;
  exec(command);
  setName(name, file);
  console.log(chalk.blue('created'), `${destinationPath}${fileName}`);
};

const setName = (name, file) => {
  let find_file = `find . -type f -name "*${snake(name)}_${file}*"`;

  let uppercase = `${find_file} -exec sed -i "" 's/TEMPLATE/${snake(name).toUpperCase()}/g' {} +`;
  exec(uppercase);
  let lowercase = `${find_file} -exec sed -i "" 's/template/${snake(name).toLowerCase()}/g' {} +`;
  exec(lowercase);
  let kneelingcamelize = `${find_file} -exec sed -i "" 's/temPlate/${kneelingCamelize(name)}/g' {} +`;
  exec(kneelingcamelize);
  let camelize = `${find_file} -exec sed -i "" 's/Template/${Camelize(name)}/g' {} +`;
  exec(camelize);
}

const generateComponent = (name) => {
  Start.createDir(snake(name), 'frontend/components/');

  let currentPath = `/usr/local/lib/node_modules/eos-redux/templates/cycle/template.jsx`;
  // let currentPath = `templates/cycle/template.jsx`;
  let destinationPath = `frontend/components/${snake(name)}/`;
  command = `cp ${currentPath} ${destinationPath}${snake(name)}.jsx`;
  exec(command);
  setComponentNames(name, false);

  generateFile(name,
               'container',
               'jsx',
               `frontend/components/${snake(name)}/`
              );
  setComponentNames(name, true);
};

const setComponentNames = (name, container) => {
  let find_file;
  if (container) {
    find_file = `find . -type f -name "*${snake(name)}_container*"`;
  } else {
    find_file = `find . -type f -name "*${snake(name)}.jsx*"`;
  }

  let uppercase = `${find_file} -exec sed -i "" 's/TEMPLATE/${snake(name).toUpperCase()}/g' {} +`
  exec(uppercase);
  let lowercase = `${find_file} -exec sed -i "" 's/template/${snake(name).toLowerCase()}/g' {} +`
  exec(lowercase);
  let kneelingcamelize = `${find_file} -exec sed -i "" 's/temPlate/${kneelingCamelize(name)}/g' {} +`
  exec(kneelingcamelize);
  let camelize = `${find_file} -exec sed -i "" 's/Template/${Camelize(name)}/g' {} +`
  exec(camelize);
};


// Export

let Generate = {
  generateFile: generateFile,
  setName: setName,
  generateComponent: generateComponent,
  setComponentNames: setComponentNames
};

module.exports = Generate;
