import express from "express";

import {
  getCryptosSelection,
  displayCryptos,
  getCryptosList,
} from "./modules/Crypto/controller.js";
import { requestHandler } from "./modules/Axios/index.js";

import {
  displayLog,
  numberArgs,
  shutServer,
  parseArgs,
} from "./utils/index.js";

import { formateSelectedCryptos } from "./modules/Crypto/utils.js";

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
  if (hasArgs.length) {
    const parsedArgs = parseArgs(hasArgs);
    const list = await getCryptosList();
    const formattedSlctCrypto = formateSelectedCryptos(parsedArgs, list);
    const resultCryptoSelection = await getCryptosSelection(
      formattedSlctCrypto
    );
    displayCryptos(resultCryptoSelection);
  } else {
    displayLog("blue", "missing arguments, try again");
    shutServer();
  }
}
