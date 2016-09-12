/// Util
const exec = require('child_process').exec;
const chalk = require('chalk');
const snake = require('to-snake-case');

//// Start Helpers ////
let command = '';

const createDir = (dir, path) => {
  path = path ? path : '';
  command = `mkdir ${path}${dir}`;
  exec(command);
  console.log(chalk.green('created'), `${path}${dir}/`);
};

const createStartFile = (file, destinationPath) => {
  let currentPath = `/usr/local/lib/node_modules/eos-redux/templates/start/${file}`;
  // let currentPath = `templates/start/${file}`;
  command = `cp ${currentPath} ${destinationPath}`;
  exec(command);
  console.log(chalk.blue('created'), `${destinationPath}${file}`);
};

// Export

let Start = {
  createDir: createDir,
  createStartFile: createStartFile
};

module.exports = Start;
