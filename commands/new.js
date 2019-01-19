'use strict';

const chalk = require('chalk');
const file = require('../helpers/file');
const inquirer = require('../helpers/inquirer');
const runner = require('../helpers/runner');
const template = require('../helpers/template');

module.exports = {
  run: async (command, options) => {
    try {
      const configFilePath = options && options.path;

      // get configuration file
      const configuration = JSON.parse(file.getFile(configFilePath));

      // Ask questions for variables
      const answers = await inquirer.ask(configuration.variableQuestions);

      // Run pre scripts
      await runner.run(configuration.preCommands, answers);

      // Copy files and replace variables
      await template.scaffold(configuration.paths, answers);

      // Run post scripts
      await runner.run(configuration.postCommands, answers);

      console.log(chalk.green('Service created!'));
    } catch (err) {
      console.error(err);
      process.exit();
    }
  }
};
