const Start = require('./start.js');
const Util = require('../../util/util.js');

//// Remove Helpers ////
let command = '';

const file = (path) => {
  console.log(Util.chalk.red('removed'), path);
  command = `rm ${path}`;
  Util.exec(command);
};


const folder = (path) => {
  console.log(Util.chalk.red('removed'), path);
  command = `rm -rf ${path}`;
  Util.exec(command);
};

const append = (name, type, path) => {
  console.log(Util.chalk.magenta('removed'), `import in ${type}`);
  command = `sed -i "" "/${Util.Camelize(name)}${Util.Camelize(type)}/d" ${path}`;
  Util.exec(command);
};

// Export

let Remove = {
  file: file,
  folder: folder,
  append: append
};

module.exports = Remove;
