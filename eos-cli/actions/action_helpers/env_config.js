const Util = require('../../util/util.js');
const Servers = require(`../../../templates/servers/servers.js`);
const Start = require('./start.js');

const defaultExpress = (path, name) => {
  console.log('PATH: ' + path, 'NAME: ' + name);
  Util.exec(`
    cd ${path} \
    && mkdir ${name} \
    && cd ${name} \
    && echo "${Servers.express()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express \
  `);
};

const express = (name) => {
  Util.exec(`
    mkdir ${name} \
    && cd ${name} \
    && echo "${Servers.express()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express \
  `);
};

const Config = {
  express: express,
  defaultExpress: defaultExpress
};

module.exports = Config;
