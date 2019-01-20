const fs = require('fs');
const file = require('./file');
const util = require('./util');

module.exports = function(paths, variables) {
  const filePaths = file.getDirectoryFilePaths(paths.fromDirectory);

  filePaths.forEach(filePath => {
    const data = file.getFile(filePath);

    const text = util.findAndReplace(data, variables);

    copyToPath(text, filePath, paths.toDirectory);
  });
};

function copyToPath(text, filePath, toDirectory) {
  const base = process.cwd();

  const fullPath = `${base}/${toDirectory}/${filePath}`;

  fs.writeFileSync(fullPath, text);
}
