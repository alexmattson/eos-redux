// MISC //
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const snake = require('to-snake-case');
const pluralize = require('pluralize');

const kneelingCamelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
};

const Camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter) {
    return letter.toUpperCase();
  }).replace(/\s+/g, '');
};

const npmRoot = (callback) => {
  let npmRootPath = Util.exec('npm root -g');
  // Async call to create file
  npmRootPath.stdout.on('data', (data) => {
    callback(data.toString().trim());
  });
};

// Export

let Util = {
  exec: exec,
  execSync: execSync,
  chalk: chalk,
  snake: snake,
  kneelingCamelize: kneelingCamelize,
  Camelize: Camelize,
  npmRoot: npmRoot,
  pluralize: pluralize
};

module.exports = Util;
