'use strict';

const fs = require('fs');

module.exports = {
  getFile: filePath => {
    const base = process.cwd();

    const fullPath = `${base}/${filePath || 'avot.json'}`;

    return fs.readFileSync(fullPath, 'utf8');
  },
  getDirectoryFilePaths: directoryPath => {
    return stackFileNames(directoryPath, []);
  },
  directoryExists: filePath => {
    return fs.statSync(filePath).isDirectory();
  }
};

function stackFileNames(dir, stackedFiles) {
  const files = fs.readdirSync(dir);

  for (const i in files) {
    const name = dir + '/' + files[i];

    if (fs.statSync(name).isDirectory()) {
      stackFileNames(name, stackedFiles);
    } else {
      stackedFiles.push(name);
    }
  }

  return stackedFiles;
}
