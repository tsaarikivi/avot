const asker = require('../helpers/asker');
const file = require('../helpers/file');
const runner = require('../helpers/runner');
const scaffold = require('../helpers/scaffold');
const chalk = require('chalk');

module.exports = async (command, options) => {
  const configFilePath = options && options.path;

  // get configuration file
  const configuration = JSON.parse(file.getFile(configFilePath));

  // Ask questions for variables
  const answers = await asker(configuration.variableQuestions);

  // Run pre scripts
  await runner(configuration.preCommands, answers);

  // Scaffold files
  await scaffold(configuration.paths, answers);

  // Run post scripts
  await runner(configuration.postCommands, answers);

  console.log(chalk.green('Service created!'));
};
