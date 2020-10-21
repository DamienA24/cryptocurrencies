import chalk from "chalk";

const log = console.log;

export const displayLog = (color, message) => {
  return log(chalk[color](message));
};
