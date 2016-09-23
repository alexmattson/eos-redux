const Util = require('../../util/util.js');
const Servers = require(`../../../templates/servers/servers.js`)

const express = (name) => {
  Util.exec(`
    cd ${name} \
    && echo "${Servers.express()}" >> ${name}.js \
    && npm init --yes \
    && npm install --save express \
  `);
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
    && deactivate
  `)
};

const Config = {
  express: express,
  flask: flask
};

module.exports = Config;
