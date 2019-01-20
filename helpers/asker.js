const inquirer = require('inquirer');

module.exports = function(questions) {
  if (!questions || !questions.length) {
    return undefined;
  }

  return inquirer.prompt(questions);
};
