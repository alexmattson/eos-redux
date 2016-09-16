// MISC //

const exec = require('child_process').exec;
const chalk = require('chalk');
const snake = require('to-snake-case');

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
    callback(data.trim());
  });
};

// Export

let Util = {
  exec: exec,
  chalk: chalk,
  snake: snake,
  kneelingCamelize: kneelingCamelize,
  Camelize: Camelize,
  npmRoot: npmRoot
};

module.exports = Util;
