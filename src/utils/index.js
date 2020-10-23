import chalk from "chalk";
import ora from "ora";

const log = console.log;

export function displayLog(color, message) {
  return log(chalk[color](message));
}

export function numberArgs() {
  return process.argv.slice(2);
}

export function shutServer() {
  process.exit(0);
}

export function parseArgs(args) {
  const output = args.reduce((acc, item, index) => {
    if (/^\[.+\]$/.test(item)) {
      try {
        const itemParsed = JSON.parse(item);
        acc.push(itemParsed);
      } catch (error) {
        displayLog("red", "wrong options");
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
  return output;
}

export function startLoader(text) {
  const spinner = ora(text).start();
  return spinner;
}

export function stopLoader(oraInstance, status) {
  switch (status) {
    case "succeed":
      oraInstance.succeed();
      break;
    case "warn":
      oraInstance.warn();
      break;
    case "fail":
      oraInstance.fail();
    default:
      oraInstance.stop();
  }
}

export function addSpace() {
  process.stdout.write("\n");
}
