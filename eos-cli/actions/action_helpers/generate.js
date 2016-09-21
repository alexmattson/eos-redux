const Start = require('./start.js');
const Util = require('../../util/util.js');

//// Generate Helpers ////
let command = '';

const generateFile = (name, file, type, destinationPath) => {
  let fileName = `${Util.snake(name)}_${file}.${type}`;
  console.log(Util.chalk.blue('created'), `${destinationPath}${fileName}`);

  Util.npmRoot((npmRoot) => {
    let currentPath = `${npmRoot}/eos-redux/templates/cycle/template_${file}.${type}`;
    command = `cp ${currentPath} ${destinationPath}${fileName}`;
    Util.exec(command);
    setName(name, file);
  });
};

const generateComponent = (name) => {

  Util.npmRoot((npmRoot) => {
    let currentPath = `${npmRoot}/eos-redux/templates/cycle/template.jsx`;
    let destinationPath = `frontend/components/${Util.snake(name)}/`;
    command = `cp ${currentPath} ${destinationPath}${Util.snake(name)}.jsx`;
    Util.exec(command);
    Start.createDir(Util.snake(name), 'frontend/components/');
    setComponentNames(name, false);

    generateFile(name,
                 'container',
                 'jsx',
                 `frontend/components/${Util.snake(name)}/`
                );
    setComponentNames(name, true);
  });
};

let pluralCommand = (file, name) => {
  return (
    `${find_file} -exec sed -i "" -e 's/TEMPLATES/${Util.snake(Util.pluralize(name)).toUpperCase()}/g' -e 's/templates/${Util.snake(Util.pluralize(name)).toLowerCase()}/g' -e 's/temPlates/${Util.kneelingCamelize(Util.pluralize(name))}/g' -e 's/Templates/${Util.Camelize(Util.pluralize(name))}/g' {} +`
  )
};

let singularCommand = (file, name) => {
  return (
    `${find_file} -exec sed -i "" -e 's/TEMPLATE/${Util.snake(name).toUpperCase()}/g' -e 's/template/${Util.snake(name).toLowerCase()}/g' -e 's/temPlate/${Util.kneelingCamelize(name)}/g' -e 's/Template/${Util.Camelize(name)}/g' {} +`
  )
};

const setName = (name, file) => {
  find_file = `find . -type f -name "*${Util.snake(name)}_${file}*"`;
  Util.exec(pluralCommand(file, name), () => {
    Util.exec(singularCommand(file, name));
  });
};

const setComponentNames = (name, container) => {
  let find_file;
  if (container) {
    find_file = `find . -type f -name "*${Util.snake(name)}_container*"`;
  } else {
    find_file = `find . -type f -name "*${Util.snake(name)}.jsx*"`;
  }

  Util.exec(pluralCommand(file, name), () => {
    Util.exec(singularCommand(file, name));
  });
};

const append = (name, type) => {
  const masterFile = type === "middleware" ? "master_middleware" : "root_reducer";
  const appliedFile = () => {
    if (type === "middleware") {
      return `${Util.Camelize(name)}Middleware`;
    } else {
      return `${Util.snake(name)}: ${Util.Camelize(name)}Reducer`;
    }
  };

  const file = `find . -type f -name "*${masterFile}*"`;
  command = `${file} -exec sed -i "" -e "/import.*'redux';/a \\\\
  import ${Util.Camelize(name)}${Util.Camelize(type)} from './${Util.snake(name)}_${type}';" -e '/);/ i \\
  ${appliedFile()}' -e '/${Util.Camelize(type)}$/ s/$/,/' {} +`;
  let tabFixCommand = `${file} -exec sed -i "" -e '/${Util.Camelize(type)}$/ s/^/\\'$'\\t''/' {} +`;
  Util.exec(command, () => {
    Util.exec(tabFixCommand);
  });
  console.log(Util.chalk.blue('appended'),
    `${Util.Camelize(name)}${Util.Camelize(type)} to ${Util.Camelize(masterFile)}`);
};

// Export

let Generate = {
  generateFile: generateFile,
  setName: setName,
  generateComponent: generateComponent,
  setComponentNames: setComponentNames,
  append: append
};

module.exports = Generate;
