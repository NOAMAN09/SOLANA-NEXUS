import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wallet, Coins, BarChart3, Activity } from "lucide-react";

const CyberpunkTest: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="cyber-font text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text animate-text-glow-blue mb-8">
        CYBERPUNK THEME TEST
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="cyber-glass animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="border-b border-cyber-blue/20">
            <CardTitle className="cyber-font text-cyber-blue">CYBER GLASS CARD</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">This is a glass-morphism card with cyber blue accents.</p>
            <Button className="cyber-button">
              <Zap className="h-4 w-4 mr-2" />
              CYBER BUTTON
            </Button>
          </CardContent>
        </Card>
        
        <Card className="cyber-glass-purple animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="border-b border-cyber-purple/20">
            <CardTitle className="cyber-font text-cyber-purple">CYBER GLASS PURPLE</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">This is a glass-morphism card with cyber purple accents.</p>
            <Button className="cyber-button-purple">
              <Wallet className="h-4 w-4 mr-2" />
              CYBER BUTTON PURPLE
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
        
        <Card className="cyber-glass animate-slide-in-bottom" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="cyber-font text-sm font-medium text-cyber-blue">ASSETS</h2>
              <Coins className="h-5 w-5 text-cyber-blue animate-pulse-opacity" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="cyber-font text-3xl font-bold text-white">12</p>
              <span className="cyber-font text-sm text-muted-foreground">TOKENS</span>
            </div>
            <p className="cyber-font text-sm text-muted-foreground mt-1">
              5 NFTs in your collection
            </p>
            
            {/* Animated progress bar */}
            <div className="mt-4 h-1 w-full bg-cyber-blue/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple animate-pulse-opacity"
                style={{ width: '70%' }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="cyber-circuit-bg p-8 rounded-lg border border-cyber-blue/30 animate-slide-in-bottom" style={{ animationDelay: '0.6s' }}>
        <h2 className="cyber-font text-xl font-bold text-cyber-blue mb-4">CIRCUIT BACKGROUND</h2>
        <p className="mb-4">This element has the cyber-circuit-bg class applied to it.</p>
        <div className="flex gap-4">
          <Button className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue/90 hover:to-cyber-purple/90 text-black font-medium shadow-cyber-blue hover:shadow-cyber-button transition-all duration-300">
            GRADIENT BUTTON
          </Button>
          <Button variant="outline" className="border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 hover:border-cyber-blue/50 hover:shadow-cyber-blue transition-all duration-300">
            OUTLINE BUTTON
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkTest;