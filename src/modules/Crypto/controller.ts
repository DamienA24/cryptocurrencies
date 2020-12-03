import { requestHandler } from '../Axios/index';
import {
  recoverDataToCatch,
  createTableConfig,
  sortCryptoResult,
  customizeCrypto,
  createLineMain,
  changeKeyName
} from './utils';
import * as tableImport from 'table';
const { table } = tableImport;

export const getCryptosList = async (api, url) => {
  const result = await requestHandler(api, url, '', {}, {}, '');
  return result.data;
};

export const getCryptosSelection = async (selection, options) => {
  const { cryptosSlected } = selection;
  const result = await requestHandler(
    options.api,
    'coins/markets',
    'GET',
    {
      vs_currency: options.currency,
      ids: cryptosSlected
    },
    {},
    ''
  );
  const newArray = changeKeyName(result.data, [
    { keyToChange: 'market_cap_rank', changeTo: 'rank' },
    { keyToChange: 'current_price', changeTo: 'price' }
  ]);
  return {
    data: newArray,
    currency: options.currency
  };
};

export const displayCryptos = (cryptos, options) => {
  const sortResult = sortCryptoResult(options.filter, cryptos);
  const data = sortResult.reduce(
    (acc, crypto) => {
      const dataToCapture = recoverDataToCatch(options.api);
      const dataCaptured = customizeCrypto(
        dataToCapture,
        crypto,
        options.currency
      );
      acc.push(dataCaptured);
      return acc;
    },
    [createLineMain(options.api)]
  );
  const config = createTableConfig(2, 7, {
    alignment: 'right'
  });
  const output = table(data, config);
  console.log(output);
};
