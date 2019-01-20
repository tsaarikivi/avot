const exec = require('child_process').exec;
const util = require('./util');

module.exports = function(commands, variables) {
  if (!commands || !commands.length) {
    return undefined;
  }

  const promises = commands.map(command => {
    const finalCommand = util.findAndReplace(command, variables);
    return runCommand(finalCommand);
  });

  return Promise.all(promises);
};

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stdout) {
        resolve(stdout);
      }
      if (stderr) {
        reject(stderr);
      }
    });
  });
}
