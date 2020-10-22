import chalk from "chalk";

export function colorText(color, text) {
  return chalk[color](text);
}

export function createLineMain() {
  return [
    "Rank",
    "Name",
    "Price",
    "High 24h",
    "Low 24h",
    "Change 24h (%)",
    "Market cap",
    "Total volume",
  ];
}

export function recoverDataToCatch() {
  return [
    "market_cap_rank",
    "name",
    "current_price",
    "high_24h",
    "low_24h",
    "price_change_percentage_24h",
    "market_cap",
    "total_volume",
  ];
}

export function formateSum(value, currency) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency,
  });
}

export function formateCrypto(dataToCatch, crypto, currency) {
  const formattedData = dataToCatch.map((item) => {
    let value = "";
    switch (item) {
      case "price_change_percentage_24h":
        value = crypto[item].toFixed(2);
        return value > 0
          ? colorText("green", `▲ ${value}%`)
          : colorText("red", `▼ ${value}%`);
      case "current_price":
      case "market_cap":
        value = formateSum(crypto[item], currency);
        return colorText("yellow", value);
      case "high_24h":
        value = formateSum(crypto[item], currency);
        return colorText("green", value);
      case "low_24h":
        value = formateSum(crypto[item], currency);
        return colorText("red", value);
      case "total_volume":
        value = formateSum(crypto[item], currency);
        return colorText("blue", value);
      case "name":
        value = crypto[item];
        return colorText("magenta", value);
      default:
        value = crypto[item];
        return colorText("cyan", value);
    }
  });
  return formattedData;
}

export function createTableConfig(start, stop, spec) {
  let obj = {};
  for (let index = start; index <= stop; index++) {
    const element = {
      [index]: spec,
    };
    obj.columns = { ...obj.columns, ...element };
  }

  return obj;
}

export function formateSelectedCryptos(userSearches, cryptosList) {
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
}

export function recoverOptions(userOptions) {
  let options = {
    currency: "eur",
    order: "",
  };
  const availableCurrency = ["eur", "usd", "jpy", "gbp"];
  if (userOptions.length) {
    const [currency, order] = userOptions;
    const lowerCaseCurrency = currency.toLowerCase();
    (options.currency = availableCurrency.includes(lowerCaseCurrency)
      ? lowerCaseCurrency
      : "eur"),
      (options.order = order);
  }
  return options;
}
