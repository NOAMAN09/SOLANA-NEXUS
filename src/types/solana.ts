
import { PublicKey } from "@solana/web3.js";

export interface TokenInfo {
  symbol: string;
  name: string;
  logoURI?: string;
  address: string;
  decimals: number;
  balance: number;
  usdValue?: number;
}

export interface NFTInfo {
  name: string;
  description?: string;
  image: string;
  mint: string;
  collection?: {
    name: string;
    family?: string;
  };
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface WalletState {
  connected: boolean;
  connecting: boolean;
  publicKey: PublicKey | null;
  walletName: string | null;
}

export interface PortfolioState {
  totalValueUSD: number;
  tokens: TokenInfo[];
  nfts: NFTInfo[];
}

export type TokenPair = {
  inputToken: TokenInfo | null;
  outputToken: TokenInfo | null;
};

export interface SwapState extends TokenPair {
  inputAmount: string;
  outputAmount: string;
  slippage: number;
  loading: boolean;
  route: any | null;
}
