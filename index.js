#! /usr/bin/env node

// import { program } from 'commander';
const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');

let command = '';

// HELPERS //

const createDir = (dir, path) => {
  path = path ? path : '';
  command = `mkdir ${path}${dir}`;
  exec(command);
  console.log(chalk.green('created'), `${path}${dir}/`);
};

const createFile = (file, destinationPath) => {
  command = `cp node_modules/eos-redux/templates/${file} ${destinationPath}`;
  exec(command);
  console.log(chalk.blue('created'), `${destinationPath}${file}`);
};

// ACTIONS //

const generate = () => {
  createDir('frontend');
  createDir('actions', 'frontend/');
  createDir('components', 'frontend/');
    createFile('root.jsx', 'frontend/components/');
  createDir('middleware', 'frontend/');
    createFile('master_middleware.js', 'frontend/middleware/');
  createDir('reducers', 'frontend/');
    createFile('root_reducer.js', 'frontend/reducers/');
  createDir('store', 'frontend/');
    createFile('store.js', 'frontend/store/');
  createDir('util', 'frontend/');
  createFile('index.jsx', 'frontend/');
  createFile('webpack.config.js', './');
};

// PROGRAM //

program
  .version('0.0.1')
  .command('generate')
    .action(generate);

program.parse(process.argv);
