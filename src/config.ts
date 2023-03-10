export interface Config {
  chainIDs: number[];
  chainEnv: 'development' | 'production';
  blockExplorerUrl: string;
  apiUrl: string;
  graphQLApi: string;
  contractAddress: string;
  tokenAddress: string;
}

const chainEnv = process.env.CHAIN_ENV as Config['chainEnv'];

const config: Config = {
  chainEnv,
  chainIDs: chainEnv === 'production' ? [137] : [80001],
  blockExplorerUrl: chainEnv === 'production' ? 'https://polygonscan.com/' : 'https://mumbai.polygonscan.com/',
  apiUrl: chainEnv === 'production'
    ? 'https://polygon-mainnet.g.alchemy.com/v2/ZkhqWnD_yJHX3Jh-kxyc-6OsGf7BOOTM'
    : 'https://polygon-mumbai.g.alchemy.com/v2/FenTMGjvdg8V-CWq7gnLHC5k4lKVnOpV',
  graphQLApi: chainEnv === 'production'
    ? 'https://api.goldsky.com/api/public/project_cl8unl8gr045a0hu9hicx5lkn/subgraphs/chain-mandala/prod/gn'
    : 'https://api.goldsky.com/api/public/project_cl8unl8gr045a0hu9hicx5lkn/subgraphs/chain-mandala-mumbai/live/gn',
  contractAddress: chainEnv === 'production' ? '0xee398b138b18865aC33b53C22E76D0d31D40a20A' : '0x29AcF7370f8c196DD49C623E4a1Bfa5350565Dc6',
  tokenAddress: chainEnv === 'production' ? '0xfCf181ddb07d3a0515F2325d455Aa234E670B248' : '0x87F789c95A137F915DA83aCd32bBb3724631F997',
};

export default config;
