
import React from "react";
import { useSolanaStore } from "@/store/solanaStore";
import TokenBalance from "./TokenBalance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NFTGallery from "../NFT/NFTGallery";
import { Coins, Image, Activity, Layers, BarChart3 } from "lucide-react";

const Portfolio: React.FC = () => {
  const { portfolio } = useSolanaStore();
  
  return (
    <div className="mt-10 animate-slide-in-bottom" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center gap-3 mb-6">
        <Layers className="h-5 w-5 text-cyber-purple" />
        <h2 className="cyber-font text-2xl font-bold bg-gradient-to-r from-cyber-purple to-cyber-pink text-transparent bg-clip-text">
          PORTFOLIO ASSETS
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-cyber-purple to-cyber-pink animate-pulse-opacity"></div>
      </div>
      
      <Card className="w-full border border-cyber-purple/30 bg-cyber-dark-purple/30 backdrop-blur-md shadow-cyber-purple">
        <CardHeader className="pb-2 border-b border-cyber-purple/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="cyber-font text-cyber-purple">DIGITAL ASSETS</CardTitle>
              <CardDescription className="cyber-font">Manage your tokens and NFTs</CardDescription>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-purple/30 bg-cyber-purple/5">
              <Activity className="h-4 w-4 text-cyber-purple animate-pulse" />
              <span className="cyber-font text-xs text-cyber-purple">LIVE TRACKING</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="tokens" className="w-full">
            <TabsList className="mb-6 w-full bg-cyber-dark-purple/50 border border-cyber-purple/20">
              <TabsTrigger 
                value="tokens" 
                className="cyber-font data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple data-[state=active]:shadow-cyber-purple"
              >
                <Coins className="h-4 w-4 mr-2" />
                TOKENS
              </TabsTrigger>
              <TabsTrigger 
                value="nfts"
                className="cyber-font data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple data-[state=active]:shadow-cyber-purple"
              >
                <Image className="h-4 w-4 mr-2" />
                NFTs
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="cyber-font data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple data-[state=active]:shadow-cyber-purple"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                ANALYTICS
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tokens" className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolio.tokens.map((token, index) => (
                  <div key={token.address} className="animate-slide-in-bottom" style={{ animationDelay: `${index * 0.05}s` }}>
                    <TokenBalance token={token} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nfts" className="animate-fade-in">
              <NFTGallery nfts={portfolio.nfts} />
            </TabsContent>
            
            <TabsContent value="analytics" className="animate-fade-in">
              <div className="cyber-glass p-6 text-center">
                <div className="inline-block p-4 rounded-full bg-cyber-purple/10 mb-4">
                  <BarChart3 className="h-10 w-10 text-cyber-purple animate-pulse-opacity" />
                </div>
                <h3 className="cyber-font text-xl font-bold text-cyber-purple mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed portfolio analytics will be available in the next update
                </p>
                
                {/* Placeholder chart */}
                <div className="mt-6 h-40 w-full bg-cyber-dark-purple/30 rounded-lg border border-cyber-purple/20 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    <path 
                      d="M0,30 Q10,20 20,25 T40,15 T60,20 T80,10 T100,15" 
                      fill="none" 
                      stroke="rgba(157, 0, 255, 0.5)" 
                      strokeWidth="1"
                      className="animate-pulse-opacity"
                    />
                    <path 
                      d="M0,35 Q10,30 20,32 T40,25 T60,30 T80,20 T100,25" 
                      fill="none" 
                      stroke="rgba(0, 255, 255, 0.5)" 
                      strokeWidth="1"
                      className="animate-pulse-opacity"
                      style={{ animationDelay: '1s' }}
                    />
                  </svg>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
