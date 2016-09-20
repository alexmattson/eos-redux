const Util = require('../../util/util.js');

//// Start Helpers ////
let command = '';

const createDir = (dir, path) => {
  path = path ? path : '';
  command = `mkdir ${path}${dir}`;
  Util.exec(command);
  console.log(Util.chalk.green('creating'), `${path}${dir}/`);
};

const createStartFile = (file, destinationPath) => {
  console.log(Util.chalk.blue('creating'), `${destinationPath}${file}`);

  Util.npmRoot((npmRoot) => {
    let currentPath =  `${npmRoot}/eos-redux/templates/start/${file}`;
    command = `cp ${currentPath} ${destinationPath}`;
    Util.exec(command);
  });

};

const installDependencies = (name) => {
  console.log('Installing dependencies. This could take a few minutes...');
  let install = Util.exec(`cd ${name} && npm install`);
  install.on('close', (code) => {
    console.log(`Done`);
  });
};


// Export

let Start = {
  createDir: createDir,
  createStartFile: createStartFile,
  installDependencies: installDependencies
};

module.exports = Start;
