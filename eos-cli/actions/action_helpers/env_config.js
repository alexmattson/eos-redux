const Util = require('../../util/util.js');
const Servers = require(`../../../templates/servers/servers.js`);
const Start = require('./start.js');

const defaultExpress = (path, name) => {
  Util.exec(`
    cd ${path} \
    && mkdir ${name} \
    && cd ${name} \
    && mkdir static \
    && echo "${Servers.express()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express morgan \
  `).on('close', (data) => {
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

const flask = (name) => {
  Util.exec(`
    echo 'venv/' >> .gitignore \
    && mkdir ${name} \
    && cd ${name} \
    && echo "${Servers.flask()}" >> ${name}.py \
    && pip install virtualenv \
    && virtualenv -p python3 venv \
    && source venv/bin/activate \
    && pip install flask \
    && pip freeze > requirements.txt \
    && deactivate \
  `).on('close', (data) => {
    console.log(Util.chalk.blue('Created Flask Server'));
    console.log('Installing server dependencies. This could take a few minutes...');
  });
};

const Config = {
  express: express,
  flask: flask
  defaultExpress: defaultExpress
};

module.exports = Config;
