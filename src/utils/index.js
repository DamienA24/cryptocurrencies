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

export function formateArgs(args) {
  const output = args.reduce((acc, item, index) => {
    if (/^\[.+\]$/.test(item)) {
      try {
        const itemParsed = JSON.parse(item);
        acc.push(itemParsed);
      } catch (error) {
        //console.log(error);
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
  return output;
}