const Util = require('../../util/util.js');
const Servers = require(`../../../templates/servers/servers.js`);
const db = require(`../../../templates/db/db.js`);
const Start = require('./start.js');

const defaultExpress = (path, name) => {
  Util.exec(`
    cd ${path} \
    && mkdir ${name} \
    && cd ${name} \
    && mkdir static \
    && echo "${Servers.defaultExpress()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express morgan pg-promise bluebird \
    && echo "${db.pg(path)}" >> pg.js \
  `).on('close', (data) => {
    pg(path);
    console.log(Util.chalk.blue('Created Express Server'));
    console.log('Installing server dependencies. This could take a few minutes...');
  });
};

const express = (name) => {
  Util.exec(`
    mkdir ${name} \
    && cd ${name} \
    && echo "${Servers.express()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express morgan \
  `).on('close', (data) => {
    console.log(Util.chalk.blue('Created Express Server'));
    console.log('Installing server dependencies. This could take a few minutes...');
  });
};

const pg = (name) => {
  require('./generate.js').generateFile(name, 'db', 'sql', name + '/server/');
};

const Config = {
  express: express,
  defaultExpress: defaultExpress,
  pg: pg
};

module.exports = Config;
