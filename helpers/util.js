'use strict';

module.exports = {
  findAndReplace: (text, variables) => {
    if (!variables) {
      return text;
    }

    let final = text;

    Object.keys(variables).forEach(variable => {
      final = final.replace(new RegExp(variable, 'g'), variables[variable]);
    });

    return final;
  }
};
