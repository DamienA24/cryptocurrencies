export interface FormattedArgs {
  cryptosSlected?: string;
  options?: Array<string>;
  cryptos?: Array<string>;
}
export interface ResultData {
  id: number | string;
  name: string;
  symbol: string;
  website_slug: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  quotes: object;
  last_updated: number;
  keyToChange?: string;
}
export interface Options {
  currency: string;
  filter?: string;
  api: string;
}
