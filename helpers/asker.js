const inquirer = require('inquirer');

module.exports = questions => {
  if (!questions || !questions.length) {
    return undefined;
  }

  return inquirer.prompt(questions);
};
