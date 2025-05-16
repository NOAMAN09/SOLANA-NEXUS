
import React from "react";
import { TokenInfo } from "@/types/solana";
import { formatCurrency, formatTokenAmount } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Send, ArrowRightLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TokenBalanceProps {
  token: TokenInfo;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ token }) => {
  // Mock data: random percentage change
  const percentChange = Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1);
  
  return (
    <Card className="cyber-glass overflow-hidden transition-all duration-300 hover:shadow-cyber-blue group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-2 border-b border-cyber-blue/10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyber-blue/20 animate-pulse-opacity"></div>
          <img
            src={token.logoURI || `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.address}/logo.png`}
            alt={token.name}
            className="w-8 h-8 rounded-full mr-2 relative z-10"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
            }}
          />
        </div>
        <div className="flex flex-col">
          <CardTitle className="cyber-font text-base font-medium text-white">{token.symbol}</CardTitle>
          <p className="cyber-font text-xs text-muted-foreground">{token.name}</p>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 hover:text-cyber-blue">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-3 relative z-10">
        <div className="flex justify-between items-baseline">
          <p className="cyber-font font-bold text-lg text-white">{formatTokenAmount(token.balance)}</p>
          <div className={`flex items-center gap-1 ${percentChange >= 0 ? 'text-cyber-green' : 'text-red-500'}`}>
            {percentChange >= 0 ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            <span className="cyber-font text-xs font-medium">{Math.abs(percentChange).toFixed(2)}%</span>
          </div>
        </div>
        <p className="cyber-font text-sm text-muted-foreground mt-1">{formatCurrency(token.usdValue || 0)}</p>
        
        {/* Animated progress bar */}
        <div className="mt-3 h-1 w-full bg-cyber-blue/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple animate-pulse-opacity"
            style={{ width: `${Math.min(100, (token.balance / 100) * 100)}%` }}
          ></div>
        </div>
        
        <div className="mt-4 flex justify-between gap-2">
          <Link to="/transfer" className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs cyber-font border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 hover:border-cyber-blue/50 hover:shadow-cyber-blue transition-all duration-300"
            >
              <Send className="h-3 w-3 mr-1" />
              SEND
            </Button>
          </Link>
          <Link to="/swap" className="flex-1">
            <Button 
              size="sm" 
              className="w-full text-xs cyber-font bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue/90 hover:to-cyber-purple/90 text-black font-medium shadow-cyber-blue hover:shadow-cyber-button transition-all duration-300"
            >
              <ArrowRightLeft className="h-3 w-3 mr-1" />
              SWAP
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBalance;
