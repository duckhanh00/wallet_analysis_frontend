export const TravaBscPool = {
  id: "trava-bsc",
  metadata: {
    poolAddress: "0x75DE5f7c91a89C16714017c7443eca20C7a8c295",
    oraclePrice: "0x7Cd53b71Bf56Cc6C9c9B43719FE98e7c360c35DF",
    incentiveAddress: "0x4c481E66798c6C82aF77d1e14d3233fE5D592A0b",
  },
};

export const TravaFtmPool = {
  id: "trava-ftm",
  metadata: {
    poolAddress: "0xD98bb590BdfAbf18c164056C185fbB6BE5ee643F",
    oraclePrice: "0x290346E682D51B97e2c1F186Eb61EB49881c5eC7",
    incentiveAddress: "0x9660f97F5a4898a0b0aBB4369e925131734c9C0D",
  },
};

export const TravaEthPool = {
  id: "trava-eth",
  metadata: {
    poolAddress: "0xD61aFaaA8A69Ba541Bc4Db9c9B40d4142B43B9A4",
    oraclePrice: "0x2BD81260fE864173B6eC1EC9Ee41a76366922565",
    incentiveAddress: "0x43CF9Fb8cf26E46890D6E3a4e6494A843bbb6615",
  },
};

export const POOL_CONFIG = {
  "trava-bsc": TravaBscPool,
  "trava-ftm": TravaFtmPool,
  "trava-eth": TravaEthPool,
};

export const POOL_IDS = {
  TRAVA_BSC: "trava-bsc",
  TRAVA_FTM: "trava-ftm",
  TRAVA_ETH: "trava-eth",
};
