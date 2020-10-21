export const getCryptosList = () => {
  const url = "https://api.coingecko.com/api/v3/coins/list";
  const result = "call api";
};

export const findSelectedCryptos = () => {};

export const findOptions = () => {
  const arr = ["arg1", "arg2", "arg3", ["opt1", "opt1"]];

  const options = arr.reduce(
    (acc, ar, index) => {
      if (Array.isArray(ar)) {
        acc.options = ar;
      } else {
        acc.cryptos = acc.cryptos ? `${acc.cryptos}, ${ar}` : ar;
      }
      return acc;
    },
    {
      cryptos: "",
      options: [],
    }
  );
};
