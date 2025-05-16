
import React from "react";
import { useSolanaStore } from "@/store/solanaStore";
import { formatCurrency } from "@/utils/formatters";
import { ArrowDown, ArrowUp, Zap, Wallet, Coins, BarChart3, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@civic/auth/react";

const DashboardHeader: React.FC = () => {
  const { portfolio } = useSolanaStore();
  const { user } = useUser();
  
  // Mock data for demonstration
  const dailyChange = 2.34; // Percentage
  const previousValue = portfolio.totalValueUSD / (1 + dailyChange / 100);
  const changeAmount = portfolio.totalValueUSD - previousValue;
  
  return (
    <div className="w-full">
      {user ? (
        <div className="animate-slide-in-bottom">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="cyber-font text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text animate-text-glow-blue">
              PORTFOLIO OVERVIEW
            </h1>
            <div className="h-px flex-1 bg-gradient-to-r from-cyber-blue to-cyber-purple animate-pulse-opacity"></div>
            <div className="px-3 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-cyber-blue text-xs animate-cyber-glow-blue">
              <span className="cyber-font">LIVE DATA</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Total Balance Card */}
            <Card className="cyber-glass animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="cyber-font text-sm font-medium text-cyber-blue">TOTAL BALANCE</h2>
                  <Wallet className="h-5 w-5 text-cyber-blue animate-pulse-opacity" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="cyber-font text-3xl font-bold text-white">{formatCurrency(portfolio.totalValueUSD)}</p>
                  <div className={`flex items-center ${dailyChange >= 0 ? 'text-cyber-green' : 'text-red-500'}`}>
                    {dailyChange >= 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    <span className="cyber-font text-sm font-medium">{Math.abs(dailyChange).toFixed(2)}%</span>
                  </div>
                </div>
                <p className="cyber-font text-sm text-muted-foreground mt-1">
                  {changeAmount >= 0 ? "+" : "-"} {formatCurrency(Math.abs(changeAmount))} today
                </p>
                
                {/* Animated progress bar */}
                <div className="mt-4 h-1 w-full bg-cyber-blue/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple animate-pulse-opacity"
                    style={{ width: `${Math.min(100, portfolio.totalValueUSD / 10)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            
            {/* Assets Card */}
            <Card className="cyber-glass-purple animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="cyber-font text-sm font-medium text-cyber-purple">ASSETS</h2>
                  <Coins className="h-5 w-5 text-cyber-purple animate-pulse-opacity" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="cyber-font text-3xl font-bold text-white">{portfolio.tokens.length}</p>
                  <span className="cyber-font text-sm text-muted-foreground">TOKENS</span>
                </div>
                <p className="cyber-font text-sm text-muted-foreground mt-1">
                  {portfolio.nfts.length} NFTs in your collection
                </p>
                
                {/* Animated progress bar */}
                <div className="mt-4 h-1 w-full bg-cyber-purple/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink animate-pulse-opacity"
                    style={{ width: `${Math.min(100, (portfolio.tokens.length / 10) * 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            
            {/* Market Trend Card */}
            <Card className="cyber-glass animate-slide-in-bottom" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="cyber-font text-sm font-medium text-cyber-blue">MARKET TREND</h2>
                  <BarChart3 className="h-5 w-5 text-cyber-blue animate-pulse-opacity" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="cyber-font text-3xl font-bold text-white">+5.2%</p>
                  <span className="cyber-font text-sm text-cyber-green">BULLISH</span>
                </div>
                <p className="cyber-font text-sm text-muted-foreground mt-1">
                  SOL price: $142.87 (+3.4%)
                </p>
                
                {/* Animated chart line */}
                <div className="mt-4 relative h-6">
                  <svg className="w-full h-full" viewBox="0 0 100 20">
                    <path 
                      d="M0,10 Q10,5 20,15 T40,10 T60,15 T80,5 T100,10" 
                      fill="none" 
                      stroke="rgba(0, 255, 255, 0.5)" 
                      strokeWidth="1"
                      className="animate-pulse-opacity"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
            
            {/* Network Status Card */}
            <Card className="cyber-glass-purple animate-slide-in-bottom" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="cyber-font text-sm font-medium text-cyber-purple">NETWORK STATUS</h2>
                  <Activity className="h-5 w-5 text-cyber-purple animate-pulse-opacity" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="cyber-font text-3xl font-bold text-white">4,289</p>
                  <span className="cyber-font text-sm text-muted-foreground">TPS</span>
                </div>
                <p className="cyber-font text-sm text-muted-foreground mt-1">
                  Block height: 228,491,382
                </p>
                
                {/* Animated pulse indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></div>
                  <span className="cyber-font text-xs text-cyber-green">NETWORK OPTIMAL</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 animate-fade-in">
          <div className="inline-block p-6 cyber-glass mb-6">
            <Zap className="h-16 w-16 mx-auto text-cyber-blue animate-cyber-glow-blue mb-4" />
          </div>
          <h1 className="cyber-font text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text animate-text-glow-blue">
            WELCOME TO SOLANA NEXUS
          </h1>
          <p className="cyber-font text-lg text-muted-foreground mb-8">
            Sign in with Civic to access your futuristic blockchain dashboard
          </p>
          <div className="h-px w-48 mx-auto bg-gradient-to-r from-cyber-blue to-cyber-purple animate-pulse-opacity"></div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
