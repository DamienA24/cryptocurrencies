import express from "express";

import { getCryptosList } from "./modules/Crypto/controller.js";
import { requestHandler } from "./modules/Axios/index.js";

import { displayLog, numberArgs, shutServer } from "./utils/index.js";

const app = express();
const port = 4000;

app.listen(port, async () => {
  displayLog("yellow", `server listening on port ${port}`);
  checkPing();
  checkArgs();
});

async function checkPing() {
  const resultPing = await requestHandler("ping");
  if (resultPing.status !== 200) {
    shutServer();
  }
}

async function checkArgs() {
  const hasArgs = numberArgs();
  if (hasArgs.length) {
    const list = await getCryptosList();
  } else {
    displayLog("blue", "missing arguments, try again");
    shutServer();
  }
}
