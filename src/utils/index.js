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
