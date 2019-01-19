'use strict';

const inqurer = require('inquirer');

module.exports = {
  ask: questions => {
    if (!questions || !questions.length) {
      return undefined;
    }

    return inqurer.prompt(questions);
  }
};
