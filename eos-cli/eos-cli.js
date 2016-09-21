#! /usr/bin/env node

// ACTIONS //

const Actions = require('./actions/actions.js');

// PROGRAM //

const program = require('commander');
let name, start;
program
  .version('0.0.1')
  .arguments('<cmd> [env1] [env2]')
  .action(function (cmd, env1, env2) {
    // Start
    if (['start', 's'].includes(cmd)) {
      start = true;
      name = env1;
      Actions.start(env1);
    }
    // Generate
    else if (['generate', 'g'].includes(cmd)) {
      Actions.generate(env1, env2);
    }
    // Server
    else if (['server'].includes(cmd)) {
      Actions.server();
    }
    // Help
    else {
      Actions.help();
    }
  })
  .option('-b, --backend [type]');

program.parse(process.argv);
if (start) Actions.backend(name, program.backend);
