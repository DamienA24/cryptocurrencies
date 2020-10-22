import express from "express";

import {
  findSelectedCryptos,
  getCryptosList,
} from "./modules/Crypto/controller.js";
import { requestHandler } from "./modules/Axios/index.js";

import {
  formateArgs,
  displayLog,
  numberArgs,
  shutServer,
} from "./utils/index.js";

const app = express();
const port = 4000;

app.listen(port, async () => {
  displayLog("yellow", `server listening on port ${port}`);
  checkPing();
  checkResearch();
});

async function checkPing() {
  const resultPing = await requestHandler("ping");
  if (resultPing.status !== 200) {
    displayLog("green", "data not available");
    shutServer();
  }
}

async function checkResearch() {
  const hasArgs = numberArgs();
  console.log(hasArgs);
  if (hasArgs.length) {
    const formatedArgs = formateArgs(hasArgs);
    const list = await getCryptosList();
    findSelectedCryptos(formatedArgs, list);
  } else {
    displayLog("blue", "missing arguments, try again");
    shutServer();
  }
}
