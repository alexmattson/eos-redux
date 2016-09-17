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
  let currentPath = `/home/paul/.linuxbrew/lib/node_modules/eos-redux/templates/start/${file}`;
  command = `cp ${currentPath} ${destinationPath}`;
  Util.exec(command);
  console.log(Util.chalk.blue('created'), `${destinationPath}${file}`);
};

const createServer = (name) => {
  command = `express ${name}-server`;
  Util.exec(command);
  console.log(Util.chalk.blue('created'), 'Express server');
  command = `cd ${name}-server && npm install`;
  Util.exec(command);
  command = `mv ${name}-server ${name}/${name}-server`;
  Util.exec(command);
};


// Export

let Start = {
  createDir: createDir,
  createStartFile: createStartFile,
  createServer: createServer
};

module.exports = Start;
