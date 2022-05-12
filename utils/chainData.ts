import * as fs from "fs";

import { fetchJson } from "ethers/lib/utils";

export const CHAIN_ID = {
  MAINNET: 1,
  RINKEBY: 4,
  GOERLI: 5,
  OPTIMISM: 10,
  BSC: 56,
  XDAI: 100,
  FUSE: 122,
  MATIC: 137,
  FANTOM: 250,
  MOVR: 1285,
  ARBITRUM: 42161,
  AVALANCHE: 43114,
};

export type ChainData = {
  name: string;
  chainId: number;
  confirmations: number;
  shortName: string;
  chain: string;
  network: string;
  networkId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: string;
  };
  assetId: Record<
    string,
    {
      symbol: string;
      mainnetEquivalent?: string;
      decimals?: number;
    }
  >;
  rpc: string[];
  subgraph: string[];
  analyticsSubgraph?: string[];
  faucets: string[];
  infoURL: string;
  gasStations: string[];
  explorers: {
    name: string;
    url: string;
    icon: string;
    standard: string;
  }[];
  gasEstimates: {
    prepare: string;
    fulfill: string;
    cancel: string;
    removeLiquidity: string;
    prepareRouterContract: string;
    fulfillRouterContract: string;
    cancelRouterContract: string;
    removeLiquidityRouterContract: string;
    prepareL1?: string;
    fulfillL1?: string;
    cancelL1?: string;
    removeLiquidityL1?: string;
    gasPriceFactor?: string;
  };
};

// Helper method to reorganize this list into a mapping by chain ID for quicker lookup.
export const chainDataToMap = (data: any): Map<string, ChainData> => {
  const chainData: Map<string, ChainData> = new Map();
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const chainId = item.chainId.toString();
    chainData.set(chainId, Object.fromEntries(Object.entries(item).filter((e) => e[0] !== "chainId")) as ChainData);
  }
  return chainData;
};

export const getChainData = async (): Promise<Map<string, ChainData> | undefined> => {
  const url = "https://raw.githubusercontent.com/connext/chaindata/main/crossChain.json";
  try {
    const data = await fetchJson(url);
    return chainDataToMap(data);
  } catch (err) {
    console.error(`Error occurred retrieving chain data from ${url}`, err);
    // Check to see if we have the chain data cached locally.
    if (fs.existsSync("./chaindata.json")) {
      console.info("Using cached chain data.");
      const data = JSON.parse(fs.readFileSync("./chaindata.json", "utf-8"));
      return chainDataToMap(data);
    }
    // It could be dangerous to let the router start without the chain data, but there's an override in place just in case.
    console.warn("Could not fetch chain data, and no cached chain data was available.");
    return undefined;
  }
};
