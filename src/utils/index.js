import chalk from "chalk";

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
