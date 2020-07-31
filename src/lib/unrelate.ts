#!/usr/bin/env node
import { configure } from './configure';
import { cleanup } from './cleanup';
import { Commands } from '../model/enums';

const args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]) {
  case Commands.CONFIGURE: {
    configure(args[1], args[2]);
    break;
  }
  case Commands.CLEANUP: {
    cleanup(args[1]);
  }
}
