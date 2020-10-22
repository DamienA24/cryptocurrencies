import { requestHandler } from "../Axios/index.js";
import { displayLog } from "../../utils/index.js";

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
