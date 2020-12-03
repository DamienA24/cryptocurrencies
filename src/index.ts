import express from 'express';

import { FormattedArgs } from './utils/interfaceValidator';
import {
  getCryptosSelection,
  getCryptosList
} from './modules/Crypto/controller';

import {
  displayResult,
  displayAlert,
  startLoader,
  displayLog,
  numberArgs,
  parseArgs,
  addSpace
} from './utils';
import {
  formateSelectedCryptos,
  recoverOptions,
  findCryptos
} from './modules/Crypto/utils';

const app = express();
const port: number = 4000;

app.listen(port, async () => {
  displayLog('yellow', `server listening on port ${port}`);
  addSpace();
  checkResearch();
});

async function checkResearch() {
  const hasArgs = numberArgs(); //checked
  const loaderInstance = startLoader('Loading data'); //checked
  if (hasArgs.length) {
    const parsedArgs = parseArgs(hasArgs); //checked
    const setOptions = recoverOptions(parsedArgs.options); //checked
    if (setOptions.api === 'coingecko') {
      const list = await getCryptosList(setOptions.api, 'coins/list'); //checked
      const formattedSlctCrypto = formateSelectedCryptos(
        parsedArgs.cryptos,
        list
      ); //checked
      if (formattedSlctCrypto.cryptosSlected) {
        const resultCryptoSelection = await getCryptosSelection(
          formattedSlctCrypto,
          setOptions
        );
        if (resultCryptoSelection.data.length) {
          displayResult(resultCryptoSelection.data, setOptions, loaderInstance);
          refreshData(formattedSlctCrypto, setOptions, '');
        } else {
          displayAlert(loaderInstance, 'red', 'No data found', 'warn');
        }
      } else {
        displayAlert(loaderInstance, 'red', 'No data found', 'warn');
      }
    } else {
      const url = `?structure=array&convert=${setOptions.currency}`;
      const list = await getCryptosList(setOptions.api, url);
      const resultCryptoSelection = findCryptos(
        parsedArgs.cryptos,
        list,
        setOptions.currency
      );
      if (resultCryptoSelection.length) {
        displayResult(resultCryptoSelection, setOptions, loaderInstance);
        refreshData(parsedArgs, setOptions, url);
      } else {
        displayAlert(loaderInstance, 'red', 'No data found', 'warn');
      }
    }
  } else {
    displayAlert(
      loaderInstance,
      'blue',
      'missing arguments, try again',
      'fail'
    );
  }
}

interface Options {
  api: string;
  currency: string;
}

function refreshData(
  formattedCrypto: FormattedArgs,
  options: Options,
  url: string
) {
  setInterval(async () => {
    const instanceLoader = startLoader('Refreshing data');
    let resultCryptoSelection = [];
    if (options.api === 'coingecko') {
      const result = await getCryptosSelection(formattedCrypto, options);
      resultCryptoSelection = result.data;
    } else {
      const list = await getCryptosList(options.api, url);
      const result = findCryptos(
        formattedCrypto.cryptos,
        list,
        options.currency
      );
      resultCryptoSelection = result;
    }

    if (resultCryptoSelection.length) {
      displayResult(resultCryptoSelection, options, instanceLoader);
    } else {
      displayAlert(instanceLoader, 'red', 'No data found', 'warn');
    }
  }, 10000);
}
