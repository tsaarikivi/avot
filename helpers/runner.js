const spawn = require('child_process').spawn;
const util = require('./util');

module.exports = (commands, variables) => {
  if (!commands || !commands.length) {
    return undefined;
  }

  const promises = commands.map(command => {
    const finalCommand = util.findAndReplace(command.command, variables);
    const finalArgs = command.args.map(arg =>
      util.findAndReplace(arg, variables)
    );
    return runCommand({ command: finalCommand, args: finalArgs });
  });

  return Promise.all(promises);
};

function runCommand(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(command.command, command.args);

    child.stdout.setEncoding('utf8').on('data', console.log);

    child.stderr.setEncoding('utf8').on('data', console.error);

    child.on('error', error => {
      reject(error);
    });

    child.on('close', () => {
      resolve();
    });
  });
}
