#!/usr/bin/env node
import { configure } from './configure';
const args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]) {
  case 'configure': {
    configure(args[1], args[2]);
    break;
  }
}
