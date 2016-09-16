const Util = require('../../util/util.js');

//// Help Helpers ////

const display = () => {
  let helpInfo = `
  ______________________________________________________________________________

                                  EOS Help
  ______________________________________________________________________________

    ${Util.chalk.inverse(' start, s ')}      # Skeletal generation

      Description:
        The ${Util.chalk.green('eos start [name]')} command creates a new EOS application with
        a default directory structure and configuration at your current path.

      Example:
        ${Util.chalk.green('eos start Sample')}
        This will generate a skeletal EOS installation.


    ${Util.chalk.inverse(' generate, g ')}   # Cycle/Element generation

      Description:
        The ${Util.chalk.green('eos generate [type] [name]')} command creates a new Redux
        element or full cycle depending on the type specified.

      Example:
        ${Util.chalk.green('eos generate cycle Sample')}
        This will generate a skeletal EOS installation.

      `;
  console.log(helpInfo);
};

// Export

let Help = {
  display: display
};

module.exports = Help;
