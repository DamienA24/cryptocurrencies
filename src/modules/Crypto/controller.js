import { requestHandler } from "../Axios/index.js";
import { displayLog } from "../../utils/index.js";
import {
  colorText,
  createLineMain,
  recoverDataToCatch,
  formateCrypto,
  createTableConfig,
} from "./utils.js";
import tableImport from "table";
const { table } = tableImport;

export const getCryptosList = async () => {
  const result = await requestHandler("coins/list");
  return result.data;
};

export const formateSelectedCryptos = (userSearches, cryptosList) => {
  const formattedArgs = userSearches.reduce(
    (acc, search) => {
      if (Array.isArray(search)) {
        acc.options = search;
      } else {
        const findCrypto = cryptosList
          .filter((cry) => cry.symbol === search || cry.name === search)
          .map((result) => result.id)
          .join("");
        acc.cryptosSlected = acc.cryptosSlected
          ? `${acc.cryptosSlected}, ${findCrypto}`
          : findCrypto;
      }
      return acc;
    },
    {
      cryptosSlected: "",
      options: [],
    }
  );
  return formattedArgs;
};

export const getCryptosSelection = async (selection) => {
  const { cryptosSlected } = selection;
  const result = await requestHandler("coins/markets", "GET", {
    vs_currency: "usd",
    ids: cryptosSlected,
  });
  return result.data;
};

export const displayCryptos = (cryptos) => {
  const data = cryptos.reduce(
    (acc, crypto) => {
      const dataToCapture = recoverDataToCatch();
      const dataCaptured = formateCrypto(dataToCapture, crypto);
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
