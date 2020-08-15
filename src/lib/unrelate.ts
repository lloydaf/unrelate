#!/usr/bin/env node
import { configure } from './configure';
import { cleanup } from './cleanup';
import { Commands, Config } from '../model/enums';

const args = process.argv.splice(process.execArgv.length + 2);

(async () => {
  try {
    switch (args[0]) {
      case Commands.CONFIGURE: {
        await configure(args[1], args[2]);
        break;
      }
      case Commands.CLEANUP: {
        await cleanup(args[1]);
      }
    }
  } catch (err) {
    logError(err?.message);
  }
})();

/**
 * @param message The error message object
 */
function logError(message: string): void {
  if (message.includes('ENOENT')) {
    console.error(`ERROR: Cannot find ${Config.TSCONFIG} in the current directory.`);
    console.log(
      `You can run 'tsc --init' to create one or refer https://www.typescriptlang.org/docs/handbook/tsconfig-json.html for more information.`,
    );
  } else {
    console.error(message);
  }
}
