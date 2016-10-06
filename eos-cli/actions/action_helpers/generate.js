const Start = require('./start.js');
const Util = require('../../util/util.js');
const Config = require('./env_config.js');
const WPSetup = require('../../../templates/frontend/webpack_setup.js');
const PackageJSONSetup = require('../../../templates/frontend/package_setup.js');

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
    // component folder
    Start.createDir(Util.snake(name), 'frontend/components/');

    // component file
    let currentPath = `${npmRoot}/eos-redux/templates/cycle/template.jsx`;
    let destinationPath = `frontend/components/${Util.snake(name)}/`;
    console.log(Util.chalk.blue('created'), `${destinationPath}${Util.snake(name)}.jsx`);
    command = `cp ${currentPath} ${destinationPath}${Util.snake(name)}.jsx`;
    Util.exec(command);
    setComponentNames(name, false);

    // comonent container
    generateFile(name,
                 'container',
                 'jsx',
                 `frontend/components/${Util.snake(name)}/`
                );
    setComponentNames(name, true);
  });
};

let pluralCommand = (find_file, name) => {
  return (
    `${find_file} -exec sed -i "" -e 's/TEMPLATES/${Util.snake(Util.pluralize(name)).toUpperCase()}/g' -e 's/templates/${Util.snake(Util.pluralize(name)).toLowerCase()}/g' -e 's/temPlates/${Util.kneelingCamelize(Util.pluralize(name))}/g' -e 's/Templates/${Util.Camelize(Util.pluralize(name))}/g' {} +`
  );
};

let singularCommand = (find_file, name) => {
  return (
    `${find_file} -exec sed -i "" -e 's/TEMPLATE/${Util.snake(name).toUpperCase()}/g' -e 's/template/${Util.snake(name).toLowerCase()}/g' -e 's/temPlate/${Util.kneelingCamelize(name)}/g' -e 's/Template/${Util.Camelize(name)}/g' {} +`
  );
};

const setName = (name, file) => {
  let find_file = `find . -type f -name "*${Util.snake(name)}_${file}*"`;
  Util.exec(pluralCommand(find_file, name), () => {
    Util.exec(singularCommand(find_file, name));
  });
};

const setComponentNames = (name, container) => {
  let find_file;
  if (container) {
    find_file = `find . -type f -name "*${Util.snake(name)}_container*"`;
  } else {
    find_file = `find . -type f -name "*${Util.snake(name)}.jsx*"`;
  }

  Util.exec(pluralCommand(find_file, name), () => {
    Util.exec(singularCommand(find_file, name));
  });
};

//Server DEPRECATED
const server = (name, type) => {

  let path = '';

  switch (type) {
    case 'none':
      Start.createStartFile(`index/index.html`, `${name}/`);
      break;
    default:
      Start.createDir(`server`, `${name}/`);
      Start.createStartFile(`index/index.ejs`, `${name}/server/`);
      path = 'backend/';
      Start.createStartFile(`../${path}app.js`, `${name}/server/`);
  }
};

const generateService = (type, name, path, defaultServer=false) => {
  if(type === 'none'){return;}
  if(defaultServer){
    Config.defaultExpress(path, name);
  } else {
    Config[type](name);
  }
};

// Append to Master Files
const append = (name, type) => {
  const masterFile = type === "middleware" ? "master_middleware" : "root_reducer";
  const appliedFile = type === "middleware"
    ? `${Util.Camelize(name)}Middleware`
    : `${Util.snake(name)}: ${Util.Camelize(name)}Reducer`;

  const file = `find . -type f -name "*${masterFile}*"`;
  command = `${file} -exec sed -i "" -e "/import.*'redux';/a \\\\
  import ${Util.Camelize(name)}${Util.Camelize(type)} from './${Util.snake(name)}_${type}';" -e '/);/ i \\
  ${appliedFile}' -e '/${Util.Camelize(type)}$/ s/$/,/' {} +`;
  let tabFixCommand = `${file} -exec sed -i "" -E -e '/${Util.Camelize(type)}$/ s/^/  /' {} +`;
  Util.exec(command, () => {
    Util.exec(tabFixCommand);
  });
  console.log(Util.chalk.magenta('appended'),
    `${Util.Camelize(name)}${Util.Camelize(type)} to ${Util.Camelize(masterFile)}`);
};

const generateWebpack = (framework, name) => {
  const wpConfig = WPSetup('dev', framework);
  const wpConfigProd = WPSetup('prod', framework);
  Util.exec(`
    cd ${name}/frontend \
    && echo "${wpConfig}" >> webpack.config.js \
    && echo "${wpConfigProd}" >> webpack_prod.config.js
  `);
};

const generatePackageJSON = (name) => {
  const packageJSON = PackageJSONSetup();
  Util.exec(`
    cd ${name}/frontend \
    && echo '${packageJSON}' >> package.json \
  `);
};

// Export

let Generate = {
  generateFile: generateFile,
  setName: setName,
  generateComponent: generateComponent,
  setComponentNames: setComponentNames,
  server: server,
  generateService: generateService,
  generateWebpack: generateWebpack,
  generatePackageJSON: generatePackageJSON,
  append: append
};

module.exports = Generate;
