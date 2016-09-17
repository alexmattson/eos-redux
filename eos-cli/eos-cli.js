#! /usr/bin/env node

// ACTIONS //

const Actions = require('./actions/actions.js');

// PROGRAM //

const program = require('commander');

program
  .version('0.0.1')
  .arguments('<cmd> [env1] [env2]')
  .action(function (cmd, env1, env2) {
    // Start
    if (['start', 's'].includes(cmd)) {
      Actions.start(env1);
    }
    // Generate
    else if (['generate', 'g'].includes(cmd)) {
      Actions.generate(env1, env2);
    }
    // Server
    else if (['server', 's'].includes(cmd)) {
      Actions.server();
    }
    // Help
    else {
      Actions.help();
    }
  });

program.parse(process.argv);
