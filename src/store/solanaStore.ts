
import { create } from "zustand";
import { NFTInfo, PortfolioState, SwapState, TokenInfo } from "@/types/solana";
import { Connection } from "@solana/web3.js";

// Mock data for initial development
const mockTokens: TokenInfo[] = [
  {
    symbol: "SOL",
    name: "Solana",
    logoURI: "https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    address: "So11111111111111111111111111111111111111112",
    decimals: 9,
    balance: 5.234,
    usdValue: 520.43,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logoURI: "https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    balance: 1205.43,
    usdValue: 1205.43,
  },
  {
    symbol: "BONK",
    name: "Bonk",
    logoURI: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 5,
    balance: 1450000,
    usdValue: 43.5,
  },
];

const mockNFTs: NFTInfo[] = [
  {
    name: "Solana Monkey #1234",
    description: "Solana Monkey Business NFT Collection",
    image: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Farweave.net%2Ff_iXm4HFp2P-7BLoZrmc0jLr_wbMTl-3hVlZ9JP0yc0%3Fext%3Dpng",
    mint: "7CRbQsEHbFPahVUuMZKBwzVVNj6JjH4inWzqKnbWKP7n",
    collection: {
      name: "Solana Monkey Business",
    },
  },
  {
    name: "DeGod #5678",
    description: "DeGods NFT Collection",
    image: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Farweave.net%2F46TXk7mmI5KGirjF5XBHP3bKMKfgbYHoNby2XrNtPnk%3Fext%3Dpng",
    mint: "2XxqD8k5HnwWL7vJ18aCRy3Bk4ZGbP7wP9gQNWTw5X5c",
    collection: {
      name: "DeGods",
    },
  },
];

interface SolanaStore {
  // Portfolio state
  portfolio: PortfolioState;
  
  // Mock wallet state for compatibility
  wallet: {
    connected: boolean;
    publicKey: null;
  };
  
  // Swap state
  swap: SwapState;
  setInputToken: (token: TokenInfo | null) => void;
  setOutputToken: (token: TokenInfo | null) => void;
  setInputAmount: (amount: string) => void;
  setOutputAmount: (amount: string) => void;
  setSlippage: (slippage: number) => void;
  resetSwap: () => void;
}

// For compatibility with existing code
export const getConnection = (): Connection => {
  return new Connection("https://api.mainnet-beta.solana.com");
};

export const useSolanaStore = create<SolanaStore>((set, get) => ({
  // Initialize portfolio state with mock data
  portfolio: {
    totalValueUSD: mockTokens.reduce((total, token) => total + (token.usdValue || 0), 0),
    tokens: mockTokens,
    nfts: mockNFTs,
  },
  
  // Mock wallet state
  wallet: {
    connected: false,
    publicKey: null,
  },
  
  // Initialize swap state
  swap: {
    inputToken: mockTokens[0],
    outputToken: mockTokens[1],
    inputAmount: "0",
    outputAmount: "0",
    slippage: 0.5,
    loading: false,
    route: null,
  },
  
  setInputToken: (token) =>
    set((state) => ({
      swap: { ...state.swap, inputToken: token },
    })),
  
  setOutputToken: (token) =>
    set((state) => ({
      swap: { ...state.swap, outputToken: token },
    })),
  
  setInputAmount: (amount) =>
    set((state) => ({
      swap: { ...state.swap, inputAmount: amount },
    })),
  
  setOutputAmount: (amount) =>
    set((state) => ({
      swap: { ...state.swap, outputAmount: amount },
    })),
  
  setSlippage: (slippage) =>
    set((state) => ({
      swap: { ...state.swap, slippage },
    })),
  
  resetSwap: () =>
    set((state) => ({
      swap: {
        inputToken: state.portfolio.tokens[0],
        outputToken: state.portfolio.tokens[1],
        inputAmount: "0",
        outputAmount: "0",
        slippage: 0.5,
        loading: false,
        route: null,
      },
    })),
}));
