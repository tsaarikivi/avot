const fs = require('fs');
const path = require('path');
const util = require('./util');

module.exports = ({ paths, __configFileDir }, variables) => {
  // get paths relative to config file
  const fromPath = path.join(__configFileDir, paths.fromDirectory);
  const toPath = path.join(
    __configFileDir,
    paths.toDirectory,
    variables.SERVICE_NAME
  );

  copyRecursiveSync(fromPath, toPath, variables);
};

function copyRecursiveSync(src, dest, variables) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {
    fs.mkdirSync(dest);

    fs.readdirSync(src).forEach(childItemName => {
      const fromFilePath = path.join(src, childItemName);
      const toFilePath = path.join(dest, childItemName);

      copyRecursiveSync(fromFilePath, toFilePath, variables);
    });
  } else {
    const data = fs.readFileSync(src, 'utf8');
    const text = util.findAndReplace(data, variables);

    fs.writeFileSync(dest, text);
  }
}
