const Start = require('./start.js');
const Util = require('./util.js');

//// Generate Helpers ////
let command = '';

const generateFile = (name, file, type, destinationPath) => {
  let currentPath = `/usr/local/lib/node_modules/eos-redux/templates/cycle/template_${file}.${type}`;
  // let currentPath = `node_modules/eos-redux/templates/cycle/template_${file}.${type}`
  // let currentPath = `templates/cycle/template_${file}.${type}`;
  let fileName = `${Util.snake(name)}_${file}.${type}`;
  command = `cp ${currentPath} ${destinationPath}${fileName}`;
  Util.exec(command);
  setName(name, file);
  console.log(Util.chalk.blue('created'), `${destinationPath}${fileName}`);
};

const setName = (name, file) => {
  let find_file = `find . -type f -name "*${Util.snake(name)}_${file}*"`;

  let uppercase = `${find_file} -exec sed -i "" 's/TEMPLATE/${Util.snake(name).toUpperCase()}/g' {} +`;
  Util.exec(uppercase);
  let lowercase = `${find_file} -exec sed -i "" 's/template/${Util.snake(name).toLowerCase()}/g' {} +`;
  Util.exec(lowercase);
  let kneelingcamelize = `${find_file} -exec sed -i "" 's/temPlate/${Util.kneelingCamelize(name)}/g' {} +`;
  Util.exec(kneelingcamelize);
  let camelize = `${find_file} -exec sed -i "" 's/Template/${Util.Camelize(name)}/g' {} +`;
  Util.exec(camelize);
}

const generateComponent = (name) => {
  Start.createDir(Util.snake(name), 'frontend/components/');

  let currentPath = `/usr/local/lib/node_modules/eos-redux/templates/cycle/template.jsx`;
  // let currentPath = `templates/cycle/template.jsx`;
  let destinationPath = `frontend/components/${Util.snake(name)}/`;
  command = `cp ${currentPath} ${destinationPath}${Util.snake(name)}.jsx`;
  Util.exec(command);
  setComponentNames(name, false);

  generateFile(name,
               'container',
               'jsx',
               `frontend/components/${Util.snake(name)}/`
              );
  setComponentNames(name, true);
};

const setComponentNames = (name, container) => {
  let find_file;
  if (container) {
    find_file = `find . -type f -name "*${Util.snake(name)}_container*"`;
  } else {
    find_file = `find . -type f -name "*${Util.snake(name)}.jsx*"`;
  }

  let uppercase = `${find_file} -exec sed -i "" 's/TEMPLATE/${Util.snake(name).toUpperCase()}/g' {} +`
  Util.exec(uppercase);
  let lowercase = `${find_file} -exec sed -i "" 's/template/${Util.snake(name).toLowerCase()}/g' {} +`
  Util.exec(lowercase);
  let kneelingcamelize = `${find_file} -exec sed -i "" 's/temPlate/${Util.kneelingCamelize(name)}/g' {} +`
  Util.exec(kneelingcamelize);
  let camelize = `${find_file} -exec sed -i "" 's/Template/${Util.Camelize(name)}/g' {} +`
  Util.exec(camelize);
};


// Export

let Generate = {
  generateFile: generateFile,
  setName: setName,
  generateComponent: generateComponent,
  setComponentNames: setComponentNames
};

module.exports = Generate;
