
import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Portfolio from "@/components/Dashboard/Portfolio";
import SwapCard from "@/components/Swap/SwapCard";
import { useSolanaStore } from "@/store/solanaStore";
import { Routes, Route } from "react-router-dom";
import Transfer from "./Transfer";
import Profile from "./Profile";
import CyberpunkTestPage from "./CyberpunkTestPage";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <Portfolio />
    </div>
  );
};

const Swap: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Swap Tokens</h1>
      <div className="flex justify-center">
        <SwapCard />
      </div>
    </div>
  );
};

const NFTView: React.FC = () => {
  const { portfolio } = useSolanaStore();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">NFT Gallery</h1>
      <div className="bg-muted/10 p-6 rounded-lg border">
        {portfolio.nfts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolio.nfts.map((nft) => (
              <div key={nft.mint} className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/400x400/png?text=NFT";
                  }}
                />
                <div className="p-4">
                  <h3 className="font-medium">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{nft.description || "No description available"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No NFTs found in your wallet</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Staking: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Staking</h1>
      <div className="flex justify-center">
        <div className="bg-muted/50 p-10 rounded-lg text-center w-full max-w-md">
          <p>Staking functionality will be implemented in the next version</p>
        </div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/nfts" element={<NFTView />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cyberpunk-test" element={<CyberpunkTestPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Index;
