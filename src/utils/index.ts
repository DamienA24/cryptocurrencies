import chalk from 'chalk';
import ora from 'ora';

import { displayCryptos } from '../modules/Crypto/controller';
import { FormattedArgs, Options } from './interfaceValidator';

const log = console.log;

export function displayLog(color: string, message: string): void {
  return log(chalk[color](message));
}

export function numberArgs(): Array<string> {
  return process.argv.slice(2);
}

export function shutServer(): void {
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
          displayLog('red', 'wrong options, check quotes');
          shutServer();
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

export function startLoader(text: string): OraInstance {
  const spinner = ora(text).start();
  return spinner;
}

interface OraInstance {
  succeed(str: string): any;
  warn(): any;
  fail(): any;
  stop(): any;
}

export function stopLoader(oraInstance: OraInstance, status: string) {
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

export function displayResult(
  cryptSelection: Array<object>,
  options: Options,
  loaderInstance: OraInstance
): void {
  stopLoader(loaderInstance, 'succeed');
  addSpace();
  displayCryptos(cryptSelection, options);
}

export function displayAlert(
  loaderInstance: OraInstance,
  color: string,
  message: string,
  status: string
): void {
  stopLoader(loaderInstance, status);
  addSpace();
  displayLog(color, message);
  shutServer();
}
