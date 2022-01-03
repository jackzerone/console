const fs = require('fs-extra');
const shell = require('shelljs');

const { getPackages } = require('../utils/packages');
const { log } = require('../utils/logger');
const paths = require('../utils/paths');

const tsconfig = fs.readJSONSync(paths.root.tsconfig);

const packages = getPackages({ coreFirst: false });

tsconfig.compilerOptions.paths = {};
tsconfig.references = [];

packages.forEach(({ directoryName }) => {
  tsconfig.compilerOptions.paths[`@/${directoryName}/*`] = [
    `./packages/${directoryName}/src/*`,
  ];
  tsconfig.references.push({
    path: `./packages/${directoryName}/`,
  });
});

fs.writeJSONSync(paths.root.tsconfig, tsconfig);

shell.exec(`prettier --write ${paths.root.tsconfig}`);

log('check root tsconfig.json: DONE');
