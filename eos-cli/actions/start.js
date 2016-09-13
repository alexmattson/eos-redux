const Util = require('../util/util.js');

//// Start Helpers ////
let command = '';

const createDir = (dir, path) => {
  path = path ? path : '';
  command = `mkdir ${path}${dir}`;
  Util.exec(command);
  console.log(Util.chalk.green('created'), `${path}${dir}/`);
};

const createStartFile = (file, destinationPath) => {
  let currentPath = `/usr/local/lib/node_modules/eos-redux/templates/start/${file}`;
  command = `cp ${currentPath} ${destinationPath}`;
  Util.exec(command);
  console.log(Util.chalk.blue('created'), `${destinationPath}${file}`);
};


// Export

let Start = {
  createDir: createDir,
  createStartFile: createStartFile
};

module.exports = Start;
