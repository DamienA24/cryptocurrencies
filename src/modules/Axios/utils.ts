export function availableApi(key: string): string {
  const api = {
    coingecko: 'https://api.coingecko.com/api/v3/',
    altercoin: 'https://api.alternative.me/v2/ticker/'
  };
  return api[key];
}
