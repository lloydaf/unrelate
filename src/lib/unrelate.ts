#!/usr/bin/env node
import { configure } from './configure';
import { cleanup } from './cleanup';

const args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]) {
  case 'configure': {
    configure(args[1], args[2]);
    break;
  }
  case 'cleanup': {
    cleanup(args[1]);
  }
}
