import express from "express";
import chalk from "chalk";

const log = console.log;

const app = express();
const port = 4000;

app.listen(port, () => {
  log(chalk.yellow(` server listening on port ${chalk.magenta(port)}`));
});
