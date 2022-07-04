export const LS = {
  THEME: "theme",
  CONNECTOR: "connector",
  CHAIN_ID: "chainId",
  FAVORITE_TOKEN: "scoring_favorite_token",
  NONCE: "scoring_nonce",
  AUTHORIZATION: "scoring_authorization",
};

export const THEME_MODE = {
  DARK: "dark",
  LIGHT: "light",
};

export const HOLDER = {
  OVERALL: "overall",
  ORAI: "orai",
  DFYN: "dfyn",
};

export const NETWORK = {
  BSC_MAINNET: "bsc_mainnet",
  FTM_MAINNET: "ftm_mainnet",
  ETH_MAINNET: "eth_mainnet",
};

export const DATEPICKER_PREDEFINED = [
  { text: "Last 7 days", value: 7 },
  { text: "Last 14 days", value: 14 },
  { text: "Last 30 days", value: 30 },
  { text: "Last 60 days", value: 60 },
  { text: "Last 90 days", value: 90 },
];

export const navLinkConfig = [
  { name: "Lending Pool", link: "/" },
  { name: "Reserve Currency", link: "https://tradao.finance/", isToggle: true },
  { name: "Knight NFT", link: "https://nft.trava.finance/", isToggle: true },
  { name: "Staking", link: "/staking/" },
  { name: "Governance", link: "/governance" },
  { name: "BRicher", link: "/bricher" },
  { name: "Bridge", link: "/bridge" },
  { name: "Analytics", link: "/scoring/", main: true },
];

export const rankingTableHeader = [
  { title: "Rank", isSort: false },
  { title: "Token", isSort: false },
  { title: "Health", isSort: true },
  { title: "Holder", isSort: true, tooltip: "The score is evaluated based on the total number of token holders" },
  {
    title: "Distribution",
    isSort: true,
    tooltip: "The score is evaluated based on the equality of holding token among top holders",
  },
  { title: "Stability", isSort: true, tooltip: "Represents the stability of token’s price in 100 days" },
  {
    title: "Market Cap",
    isSort: true,
    tooltip: "The score is calculated based on the market capitalization of the token in comparison with other tokens",
  },
  {
    title: "Volume",
    isSort: true,
    tooltip:
      "The score is evaluated based on the total amount of token has been traded in periods of time (24 hours, 7 days, 100 days)",
  },
  { title: "Daily Tx", isSort: true, tooltip: "The score is evaluated based on daily transactions of token" },
  {
    title: "Price",
    isSort: true,
    tooltip:
      "The score is evaluated based on the ratio of the current price to the highest price of this token in history",
  },
];

export const PAGINATION_OPTION = [10, 15, 20, 30, 50, 100];

export const ANALYSIS_ROOT_URL = process.env.REACT_APP_ANALYSIS_ROOT_URL;
export const MERGE_ROOT_URL = process.env.REACT_APP_MERGE_ROOT_URL;
export const SIMULATION_ROOT_URL = "https://scoringapi.trava.finance/analysis/simulation";
export const MONITORING_ROOT_URL = "https://scoringapi.trava.finance/pool-analysis";
export const REPUTATION_ROOT_URL = "https://scoringapi.trava.finance/reputation/v1/reputation";
export const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
