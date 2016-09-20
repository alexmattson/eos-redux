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
    // Help
    else {
      Actions.help();
    }
  })
  .option('-b, --backend [type]');

program.parse(process.argv);

console.log(' backend: %j', program.backend);
