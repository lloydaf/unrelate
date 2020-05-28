#!/usr/bin/env npx ts-node

import * as index from '../src/index';

const args = process.argv.splice(process.execArgv.length + 1);

console.log('args', args);
