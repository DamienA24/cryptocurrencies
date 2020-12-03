import chalk from 'chalk';

import { FormattedArgs } from '../../utils/interfaceValidator';

export function colorText(color, text) {
  return chalk[color](text);
}

export function createLineMain(api) {
  const line = {
    coingecko: [
      'Rank',
      'Name',
      'Price',
      'High 24h',
      'Low 24h',
      'Change 24h (%)',
      'Market cap',
      'Total volume'
    ],
    altercoin: [
      'Rank',
      'Name',
      'Price',
      'Change 1h (%)',
      'Change 24h (%)',
      'Change 7d (%)',
      'Market cap',
      'Circulating supply'
    ]
  };
  return line[api];
}

export function recoverDataToCatch(api) {
  const data = {
    coingecko: [
      'rank',
      'name',
      'price',
      'high_24h',
      'low_24h',
      'price_change_percentage_24h',
      'market_cap',
      'total_volume'
    ],
    altercoin: [
      'rank',
      'name',
      'price',
      'percent_change_1h',
      'percent_change_24h',
      'percent_change_7d',
      'market_cap',
      'circulating_supply'
    ]
  };
  return data[api];
}

export function formateSum(value, currency, style) {
  switch (style) {
    case 'currency':
      return value.toLocaleString('en-US', {
        style,
        currency
      });
    case 'decimal':
      return value.toLocaleString('en-US', {
        style
      });
    default:
      break;
  }
}

export function customizeCrypto(dataToCatch, crypto, currency) {
  return dataToCatch.map((item) => {
    let value = '';
    switch (item) {
      case 'price_change_percentage_24h':
      case 'percent_change_1h':
      case 'percent_change_24h':
      case 'percent_change_7d':
        value = crypto[item].toFixed(2);
        return crypto[item] > 0
          ? colorText('green', `▲ ${value}%`)
          : colorText('red', `▼ ${value}%`);
      case 'price':
      case 'market_cap':
        value = formateSum(crypto[item], currency, 'currency');
        return colorText('yellow', value);
      case 'high_24h':
        value = formateSum(crypto[item], currency, 'decimal');
        return colorText('green', value);
      case 'low_24h':
        value = formateSum(crypto[item], currency, 'decimal');
        return colorText('red', value);
      case 'total_volume':
        value = formateSum(crypto[item], currency, 'currency');
        return colorText('blue', value);
      case 'circulating_supply':
        value = formateSum(crypto[item], currency, 'decimal');
        return colorText('blue', value);
      case 'name':
        value = crypto[item];
        return colorText('magenta', value);
      default:
        value = crypto[item];
        return colorText('cyan', value);
    }
  });
}

export function createTableConfig(start, stop, spec) {
  const obj = { columns: {} };
  for (let index = start; index <= stop; index++) {
    const element = {
      [index]: spec
    };
    obj.columns = { ...obj.columns, ...element };
  }

  return obj;
}
interface CryptosList {
  symbol: string;
  name: string;
  id: number | string;
}
export function formateSelectedCryptos(
  userSearches: Array<string>,
  cryptosList: Array<CryptosList>
): FormattedArgs {
  const formattedArgs = userSearches.reduce(
    (acc, search) => {
      const findCrypto = cryptosList
        .filter(
          (cry) =>
            cry.symbol.toLowerCase() === search ||
            cry.name.toLowerCase() === search
        )
        .map((result) => result.id)
        .join('');
      acc.cryptosSlected = acc.cryptosSlected
        ? `${acc.cryptosSlected}, ${findCrypto}`
        : findCrypto;
      return acc;
    },
    {
      cryptosSlected: ''
    }
  );
  return formattedArgs;
}
interface Options {
  currency: string;
  filter: string;
  api: string;
}
export function recoverOptions(userOptions: Array<string>): Options {
  const options: Options = {
    currency: 'eur',
    filter: 'rank_asc',
    api: 'coingecko'
  };
  const availableCurrency = ['EUR', 'USD', 'JPY', 'GBP'];
  const availableFilter = [
    'rank_asc',
    'rank_des',
    'market_cap_des',
    'market_cap_asc',
    'price_asc',
    'price_desc'
  ];
  const availableApi = ['coingecko', 'altercoin'];

  if (userOptions.length) {
    const [currency, order, api] = userOptions;
    const upperCaseCurrency = currency && currency.toUpperCase();
    options.currency = availableCurrency.includes(upperCaseCurrency)
      ? upperCaseCurrency
      : 'EUR';

    const lowerCaseFilter = order && order.toLowerCase();
    options.filter = availableFilter.includes(lowerCaseFilter)
      ? lowerCaseFilter
      : 'rank_asc';

    const lowerCaseApi = api && api.toLowerCase();
    options.api = availableApi.includes(lowerCaseApi)
      ? lowerCaseApi
      : 'coingecko';
  }
  return options;
}

export function findCryptos(selection, list, currency) {
  const formateSelection = selection.map((sel) => sel.toLowerCase());
  const selectedCryptos = formateSelection.reduce((acc, selec) => {
    const selectCrypto = list.find(
      (item) =>
        item.symbol.toLowerCase() === selec ||
        item.website_slug.toLowerCase() === selec
    );
    if (selectCrypto) {
      const newobj = { ...selectCrypto.quotes[currency], ...selectCrypto };
      delete newobj.quotes;
      acc.push(newobj);
    }
    return acc;
  }, []);
  return selectedCryptos;
}

export function changeKeyName(list, dataTochange) {
  return list.map((item) => {
    dataTochange.forEach((element) => {
      item[element.changeTo] = item[element.keyToChange];
      delete item[item.keyToChange];
    });
    return item;
  });
}

export function sortCryptoResult(sortType, list) {
  const direction = findFilter(sortType);
  if (direction.direction === 'asc') {
    return list.sort((a, b) => {
      return a[direction.filter] - b[direction.filter];
    });
  } else {
    return list.sort((a, b) => b[direction.filter] - a[direction.filter]);
  }
}

function findFilter(sortType) {
  const str = sortType.split('_');
  const direction = str.splice(str.length - 1).join();
  return {
    filter: str.join('_'),
    direction
  };
}
