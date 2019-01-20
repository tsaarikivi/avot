const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const asker = require('../helpers/asker');
const runner = require('../helpers/runner');
const scaffold = require('../helpers/scaffold');

module.exports = async (command, options) => {
  // get configuration file
  const configFilePath = (options && options.path) || 'avot.json';
  const base = process.cwd();
  const fullConfigFilePath = path.join(base, configFilePath);
  const configData = fs.readFileSync(fullConfigFilePath, 'utf8');
  const configuration = JSON.parse(configData);

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
