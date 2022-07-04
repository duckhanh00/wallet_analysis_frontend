export const detailChartConfig = [
  {
    title: "Price Score",
    types: ["price_over_highest_score_history", "price_history"],
  },
  {
    title: "Price Stability Score",
    types: ["price_stability_score_history", "price_stability_history"],
  },
  {
    title: "Number Of Transactions Score",
    types: ["number_of_transaction_score_history", "daily_transaction_history"],
  },
  {
    title: "Market Cap Score",
    types: ["market_cap_score_history", "market_cap_history"],
  },
  {
    title: "Trading Volume Score",
    types: ["trading_score_history", "trading_volume_24h_history"],
  },
  {
    title: "Holders Score",
    types: ["holders_score_history", "holder_history"],
  },
  {
    title: "Holder Distribution Score",
    types: ["holder_distribution_score_history", "holder_distribution_history"],
  },
];

export const portfolioChartConfig = [
  {
    title: "Price",
    types: "price_history",
  },
  {
    title: "Trading Volume",
    types: "trading_volume_24h_history",
  },
  {
    title: "Market Cap",
    types: "market_cap_history",
  },
  {
    title: "Number Of Transactions",
    types: "daily_transaction_history",
  },

  {
    title: "Number Of Holders",
    types: "holder_history",
  },
];

export const tokenHistoryTitles = {
  credit_score_history: "Health Score",
  market_cap_score_history: "Market Cap Score",
  market_cap_history: "Market Cap($)",
  price_over_highest_score_history: "Price Score",
  price_history: "Price($)",
  number_of_transaction_score_history: "Number Of Transactions Score",
  daily_transaction_history: "Number Of Transactions",
  trading_score_history: "Trading Volume Score",
  trading_volume_24h_history: "Trading Volume($)",
  holder_distribution_score_history: "Holder Distribution Score",
  holder_distribution_history: "Holder Distribution",
  holders_score_history: "Holders Score",
  holder_history: "Number Of Holders",
  price_stability_score_history: "Price Stability Score",
  price_stability_history: "Price Stability",
};
