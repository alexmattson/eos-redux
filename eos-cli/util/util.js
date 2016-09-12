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


// Export

let Util = {
  exec: exec,
  chalk: chalk,
  snake: snake,
  kneelingCamelize: kneelingCamelize,
  Camelize: Camelize
};

module.exports = Util;
