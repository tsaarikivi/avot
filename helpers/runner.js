'use strict';

const exec = require('child_process').exec;
const util = require('./util');

module.exports = {
  run: async (commands, variables) => {
    if (!commands || !commands.length) {
      return undefined;
    }

    for (const command of commands) {
      const finalCommand = util.findAndReplace(command, variables);

      await runCommand(finalCommand);
    }
  }
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
