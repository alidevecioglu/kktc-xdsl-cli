#! /usr/bin/env node

import { getSpeed } from './src/main.js';
import { program } from 'commander';

program
    .version('0.0.1')
    .description('A CLI for fetching speed information from XDSL page')

program
    .command('get-speed')
    .alias('gs')
    .description('Get speed information from XDSL page')
    .option('-t, --telno <telno>', 'Phone number')
    .action((options) => {
        getSpeed(options.telno);
    });

program.parse();