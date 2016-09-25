const Util = require('../../util/util.js');
const Servers = require(`../../../templates/servers/servers.js`);
const Start = require('./start.js');

const defaultExpress = (path, name) => {
  console.log(`Generating Express server.`);
  Util.exec(`
    cd ${path} \
    && mkdir ${name} \
    && cd ${name} \
    && mkdir static \
    && echo "${Servers.defaultExpress()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express morgan pg-promise \
    && echo "${Servers.pg()}" >> pg.js \
  `);
};

const express = (name) => {
  Util.exec(`
    mkdir ${name} \
    && cd ${name} \
    && echo "${Servers.express()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express morgan \
  `);
};

const Config = {
  express: express,
  defaultExpress: defaultExpress
};

module.exports = Config;
