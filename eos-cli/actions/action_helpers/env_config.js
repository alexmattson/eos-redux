const Util = require('../../util/util.js');
const Servers = require(`../../../templates/servers/servers.js`);
const Routers = require(`../../../templates/servers/routers.js`);
const Controllers = require(`../../../templates/servers/controllers.js`);
const Start = require('./start.js');

const defaultExpress = (path, name) => {
  Util.exec(`
    cd ${path} \
    && mkdir ${name} \
    && cd ${name} \
    && mkdir static \
    && echo "${Servers.express()}" >> ${name}.js \
    && echo "${Routers.express()}" >> routes.js \
    && echo "${Controllers.express()}" >> controller.js \
    && npm init --yes \
    && npm install --save express morgan eos-redux \
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
    && echo "${Routers.express()}" >> routes.js \
    && echo "${Controllers.express()}" >> controller.js \
    && npm init --yes \
    && npm install --save express morgan eos-redux \
    `).on('close', (data) => {
    console.log(Util.chalk.blue('Created Express Server'));
    console.log('Installing server dependencies. This could take a few minutes...');
  });
};

const flask = (name) => {
  Util.exec(`
    echo 'venv/\n__pycache__\n*.pyc' >> .gitignore \
    && mkdir ${name} \
    && cd ${name} \
    && echo "${Servers.flask()}" >> ${name}.py \
    && echo "${Routers.flask()}" >> routes.py \
    && echo "${Controllers.flask()}" >> controller.py \
    && pip install virtualenv \
    && virtualenv -p python3 venv \
    && source venv/bin/activate \
    && pip install flask \
    && pip install requests \
    && pip install eos_python_utils \
    && pip freeze > requirements.txt \
    && deactivate \
  `).on('close', (data) => {
    console.log(Util.chalk.blue('Created Flask Server'));
    console.log('Installing server dependencies. This could take a few minutes...');
  });
};

const Config = {
  express: express,
  flask: flask,
  defaultExpress: defaultExpress
};

module.exports = Config;
