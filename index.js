#!/usr/bin/env node
'use strict';

const program = require('commander');
const newCommand = require('./commands/new');

program
  .version('0.0.1')
  .command('new', 'Create a new microservice.')
  .option(
    '-p, --path [optional]',
    'Path to avot config file. Defaults to avot.json.'
  )
  .action(newCommand.run);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) {
  program.help();
}
