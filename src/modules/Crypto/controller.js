import { requestHandler } from "../Axios/index.js";
import { displayLog } from "../../utils/index.js";
import {
  colorText,
  createLineMain,
  recoverDataToCatch,
  formateCrypto,
  createTableConfig,
  recoverOptions,
} from "./utils.js";
import tableImport from "table";
const { table } = tableImport;

export const getCryptosList = async () => {
  const result = await requestHandler("coins/list");
  return result.data;
};

export const getCryptosSelection = async (selection) => {
  const { cryptosSlected, options } = selection;
  const userOptions = recoverOptions(options);
  const result = await requestHandler("coins/markets", "GET", {
    vs_currency: userOptions.currency,
    ids: cryptosSlected,
    order: userOptions.order,
  });
  return {
    data: result.data,
    currency: userOptions.currency,
  };
};

export const displayCryptos = (cryptos) => {
  const data = cryptos.data.reduce(
    (acc, crypto) => {
      const dataToCapture = recoverDataToCatch();
      const dataCaptured = formateCrypto(
        dataToCapture,
        crypto,
        cryptos.currency
      );
      acc.push(dataCaptured);
      return acc;
    },
    [createLineMain()]
  );
  const config = createTableConfig(2, 7, {
    alignment: "right",
  });
  const output = table(data, config);
  console.log(output);
};
