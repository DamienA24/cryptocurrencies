import express from "express";

import {
  getCryptosSelection,
  getCryptosList,
} from "./modules/Crypto/controller.js";

import {
  displayResult,
  displayAlert,
  startLoader,
  displayLog,
  numberArgs,
  parseArgs,
  addSpace,
} from "./utils/index.js";

import {
  formateSelectedCryptos,
  recoverOptions,
  findCryptos,
} from "./modules/Crypto/utils.js";

const app = express();
const port = 4000;

app.listen(port, async () => {
  displayLog("yellow", `server listening on port ${port}`);
  addSpace();
  const loaderInstance = startLoader("Loading data");
  addSpace();
  checkResearch(loaderInstance);
});

async function checkResearch(loaderInstance) {
  const hasArgs = numberArgs();
  if (hasArgs.length) {
    const parsedArgs = parseArgs(hasArgs);
    const setOptions = recoverOptions(parsedArgs.options);
    if (setOptions.api === "coingecko") {
      const list = await getCryptosList(setOptions.api, "coins/list");
      const formattedSlctCrypto = formateSelectedCryptos(
        parsedArgs.cryptos,
        list
      );
      if (formattedSlctCrypto.cryptosSlected) {
        const resultCryptoSelection = await getCryptosSelection(
          formattedSlctCrypto,
          setOptions
        );
        if (resultCryptoSelection.data.length) {
          displayResult(resultCryptoSelection.data, setOptions, loaderInstance);
          refreshData(formattedSlctCrypto, setOptions);
        } else {
          displayAlert(loaderInstance, "red", "No data found", "warn");
        }
      } else {
        displayAlert(loaderInstance, "red", "No data found", "warn");
      }
    } else {
      const url = `?structure=array&convert=${setOptions.currency}`;
      const list = await getCryptosList(setOptions.api, url);
      const resultCryptoSelection = findCryptos(
        parsedArgs.cryptos,
        list.data,
        setOptions.currency
      );
      if (resultCryptoSelection.length) {
        displayResult(resultCryptoSelection, setOptions, loaderInstance);
        refreshData(parsedArgs.cryptos, setOptions, url);
      } else {
        displayAlert(loaderInstance, "red", "No data found", "warn");
      }
    }
  } else {
    displayAlert(
      loaderInstance,
      "blue",
      "missing arguments, try again",
      "fail"
    );
  }
}

function refreshData(formattedCrypto, options, url) {
  setInterval(async () => {
    const instanceLoader = startLoader("Refreshing data");
    let resultCryptoSelection = [];
    if (options.api === "coingecko") {
      const result = await getCryptosSelection(formattedCrypto, options);
      resultCryptoSelection = result.data;
    } else {
      const list = await getCryptosList(options.api, url);
      const result = findCryptos(formattedCrypto, list.data, options.currency);
      resultCryptoSelection = result;
    }

    if (resultCryptoSelection.length) {
      displayResult(resultCryptoSelection, options, instanceLoader);
    } else {
      displayAlert(loaderInstance, "red", "No data found", "warn");
    }
  }, 10000);
}
