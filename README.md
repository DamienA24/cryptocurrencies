# cryptocurrencies
CLI to display cryptocurrencies


- Auto-refreshing every [10] seconds
- Accept an alternative display currency as an option (euros, yen...)
- Implement an alternative data source as an option (https://alternative.me/crypto/api/)
- Accept custom columns filtering and/or ordering as an option

What you can do :
- You can fetch and display a table of cryptocurrencies prices and other data
- Choose options

Available options :
- Currency ["eur", "gbp", "usd", "jpy"]
- Alternative API ["coingecko", "altercoin"]
- Ordering ascendant or descendant by price, market cap or rank 
    [
    "rank_asc",
    "rank_des",
    "market_cap_des",
    "market_cap_asc",
    "price_asc",
    "price_desc",
    ]

Options by default :
- '["eur", "rank_asc", "coingecko"]'
- Keep on mind, you have to write the options right sens and syntax :
    - [currency, filter, api] 
    - Quotation marks around the array : ''
    - Quotation marks in the array : ""

You can set just on or two options, but you have to fill in an empty character on option you don't change :
- '["", "rank_asc", "coingecko"]'
- '["gbp", "", "altercoin"]'

Command line :
- yarn run start <coins> [...options]
- yarn run start btc xrp eth eos '["usd", "rank_desc"]'
- yarn run start bitcoin eth
- yarn run start btc xrp eth eos '[usd, "rank_desc"] (options won't working, missing "")