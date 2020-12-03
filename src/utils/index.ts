import chalk from 'chalk';
import ora from 'ora';

import { displayCryptos } from '../modules/Crypto/controller';
import { FormattedArgs } from './interfaceValidator';

const log = console.log;

export function displayLog(color: string, message: string): void {
  return log(chalk[color](message));
}

export function numberArgs(): Array<string> {
  return process.argv.slice(2);
}

export function shutServer() {
  process.exit(0);
}

export function parseArgs(args: Array<string>): FormattedArgs {
  const output = args.reduce(
    (acc, item, index) => {
      if (/^\[.+\]$/.test(item)) {
        try {
          const itemParsed = JSON.parse(item);
          acc.options = itemParsed;
        } catch (error) {
          displayLog('red', 'wrong options');
        }
      } else {
        acc.cryptos.push(item.toLowerCase());
      }
      return acc;
    },
    {
      cryptos: [],
      options: []
    }
  );
  return output;
}

export function startLoader(text: string): object {
  const spinner = ora(text).start();
  return spinner;
}

export function stopLoader(oraInstance, status) {
  switch (status) {
    case 'succeed':
      const date = new Date();
      const str = `Data recover to ${date}`;
      oraInstance.succeed(str);
      break;
    case 'warn':
      oraInstance.warn();
      break;
    case 'fail':
      oraInstance.fail();
    default:
      oraInstance.stop();
  }
}

export function addSpace(): void {
  process.stdout.write('\n');
}

export function displayResult(cryptSelection, options, loaderInstance) {
  stopLoader(loaderInstance, 'succeed');
  addSpace();
  displayCryptos(cryptSelection, options);
}

export function displayAlert(loaderInstance, color, message, status) {
  stopLoader(loaderInstance, status);
  addSpace();
  displayLog(color, message);
  shutServer();
}
