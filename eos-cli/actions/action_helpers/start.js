const Util = require('../../util/util.js');

//// Start Helpers ////
let command = '';

const createDir = (dir, path) => {
  path = path ? path : '';
  command = `mkdir ${path}${dir}`;
  Util.exec(command);
  console.log(Util.chalk.green('created'), `${path}${dir}/`);
};

const createStartFile = (file, destinationPath, callback) => {
  console.log(Util.chalk.blue('creating'), `${destinationPath}${file}`);

  Util.npmRoot((npmRoot) => {
    let currentPath =  `${npmRoot}/eos-redux/templates/start/${file}`;
    command = `cp ${currentPath} ${destinationPath}`;
    let name = destinationPath.split('/')[0];
    if (callback) Util.exec(command, callback(name));
    else Util.exec(command);
  });

};

const installDependencies = (name) => {
  console.log('Installing dependencies. This could take a few minutes...');
  let install = Util.exec(`cd ${name} && npm install`);
  install.on('close', (code) => {
    console.log(`Done`);
    console.log(`IF YOU USE NVM RUN THE FOLLOWING COMMANDS:`);
    console.log(`cd ${name}`);
    console.log(`npm install`);
  });
};



// Export

let Start = {
  createDir: createDir,
  createStartFile: createStartFile,
  installDependencies: installDependencies
};

module.exports = Start;
