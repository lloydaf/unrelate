#!/usr/bin/env npx ts-node

import { configure } from '../src';

const args = process.argv.splice(process.execArgv.length + 1);

switch (args[0]) {
  case 'configure': {
    configure(args[1], args[2]);
    break;
  }
}
