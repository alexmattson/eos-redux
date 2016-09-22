const Util = require('../../util/util.js');
const Servers = require(`../../../templates/servers/servers.js`)

const express = (name) => {
  Util.exec(`
    cd ${name} \
    && echo "${Servers.express()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express \
  `);
}

const Config = {
  express: express
};

module.exports = Config;
