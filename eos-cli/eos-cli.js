#! /usr/bin/env node

// ACTIONS //

const Actions = require('./actions/actions.js');

// PROGRAM //

const program = require('commander');

program
  .version('0.0.1')
  .arguments('<cmd> [env]')
  .action(function (cmd, env) {
    // Start
    if (['start', 's'].includes(cmd)) {
      Actions.start();
    }
    // Generate
    else if (['generate', 'g'].includes(cmd)) {
      Actions.generate(env);
    }
  });

program.parse(process.argv);
