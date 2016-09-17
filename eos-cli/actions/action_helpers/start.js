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
  Util.exec(`cd ${name} && npm install`);
};

const createServer = (name,callback) => {
  console.log(Util.chalk.blue('creating'), 'Express server');
  command = `express ${name}`;
  Util.exec(command, (data)=>callback(name));
};

const setUpServer = (name) =>{
  console.log('Installing server dependencies. This could take a few minutes...');
  command = `cd ${name}/server && npm install`;
  Util.exec(command);
}


// Export

let Start = {
  createDir: createDir,
  createStartFile: createStartFile,
  installDependencies: installDependencies,
  createServer: createServer,
  setUpServer: setUpServer
};

module.exports = Start;
