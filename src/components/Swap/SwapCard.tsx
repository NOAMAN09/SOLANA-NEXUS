
import React, { useState } from "react";
import { useSolanaStore } from "@/store/solanaStore";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Settings, Zap, Rocket, BarChart3, Cpu, Gauge } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { formatTokenAmount } from "@/utils/formatters";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

const SwapCard: React.FC = () => {
  const { swap, setInputAmount, setOutputAmount, setInputToken, setOutputToken, portfolio } = useSolanaStore();
  const [slippageSetting, setSlippageSetting] = useState<number>(0.5);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputAmount(value);
    
    // Simulate output calculation (in a real app this would query Jupiter API)
    if (value && !isNaN(parseFloat(value))) {
      const mockRate = 10; // Mock rate for demo
      const calculatedOutput = parseFloat(value) * mockRate;
      setOutputAmount(calculatedOutput.toString());
    } else {
      setOutputAmount('0');
    }
  };
  
  const handleSwapTokens = () => {
    const tempInputToken = swap.inputToken;
    const tempInputAmount = swap.inputAmount;
    
    setInputToken(swap.outputToken);
    setInputAmount(swap.outputAmount);
    setOutputToken(tempInputToken);
    setOutputAmount(tempInputAmount);
  };
  
  const handleSlippageChange = (value: number[]) => {
    setSlippageSetting(value[0]);
  };
  
  const executeSwap = () => {
    // In a real app, this would call Jupiter's swap API
    toast({
      title: "Swap Executed",
      description: `Swapped ${swap.inputAmount} ${swap.inputToken?.symbol} for ${swap.outputAmount} ${swap.outputToken?.symbol}`,
    });
  };
  
  return (
    <div className="w-full max-w-md mx-auto animate-slide-in-bottom">
      <Card className="cyber-glass border-cyber-blue/30 shadow-cyber-blue overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 cyber-circuit-bg opacity-5"></div>
        
        <CardHeader className="border-b border-cyber-blue/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="cyber-font text-xl text-cyber-blue animate-text-glow-blue">SWAP AGGREGATOR</CardTitle>
              <CardDescription className="cyber-font">Powered by Jupiter Protocol</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-cyber-blue text-xs animate-pulse-opacity">
                <span className="cyber-font">JUPITER v6</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setShowSettings(!showSettings)}
                      className={`rounded-full ${showSettings ? "bg-cyber-blue/20 text-cyber-blue shadow-cyber-blue" : "text-cyber-blue hover:bg-cyber-blue/10"}`}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="cyber-glass border-cyber-blue/30">
                    <p className="cyber-font text-cyber-blue">Swap Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6 relative z-10">
          {showSettings && (
            <Card className="mb-4 cyber-glass-purple border-cyber-purple/30 animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="h-4 w-4 text-cyber-purple" />
                  <h3 className="cyber-font font-medium text-sm text-cyber-purple">SLIPPAGE TOLERANCE</h3>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[slippageSetting]}
                    min={0.1}
                    max={5}
                    step={0.1}
                    onValueChange={handleSlippageChange}
                    className="flex-1"
                  />
                  <span className="cyber-font text-sm font-medium w-12 text-right text-cyber-purple">
                    {slippageSetting.toFixed(1)}%
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-cyber-purple/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="h-4 w-4 text-cyber-purple" />
                    <h3 className="cyber-font font-medium text-sm text-cyber-purple">ROUTE OPTIMIZATION</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="cyber-font text-xs border-cyber-purple/30 bg-cyber-purple/20 text-cyber-purple">BEST PRICE</Button>
                    <Button variant="outline" size="sm" className="cyber-font text-xs border-cyber-purple/10 bg-transparent hover:bg-cyber-purple/10 hover:border-cyber-purple/30">LOWEST IMPACT</Button>
                    <Button variant="outline" size="sm" className="cyber-font text-xs border-cyber-purple/10 bg-transparent hover:bg-cyber-purple/10 hover:border-cyber-purple/30">FASTEST</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="cyber-font text-sm font-medium text-cyber-blue">YOU PAY</label>
              <span className="cyber-font text-xs text-muted-foreground">
                Balance: {swap.inputToken ? formatTokenAmount(swap.inputToken.balance) : '0'} 
              </span>
            </div>
            
            <div className="flex gap-2">
              <Select 
                value={swap.inputToken?.address}
                onValueChange={(value) => {
                  const token = portfolio.tokens.find(t => t.address === value);
                  setInputToken(token || null);
                }}
              >
                <SelectTrigger className="w-[120px] cyber-font border-cyber-blue/30 bg-cyber-blue/5 text-white">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent className="cyber-glass border-cyber-blue/30">
                  {portfolio.tokens.map((token) => (
                    <SelectItem key={token.address} value={token.address} className="cyber-font hover:bg-cyber-blue/10 focus:bg-cyber-blue/10">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-cyber-blue/20 animate-pulse-opacity"></div>
                          <img 
                            src={token.logoURI} 
                            alt={token.symbol} 
                            className="w-4 h-4 rounded-full relative z-10"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/24/png";
                            }}
                          />
                        </div>
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="0.0"
                value={swap.inputAmount}
                onChange={handleInputChange}
                className="flex-1 cyber-input"
                min="0"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-cyber-blue/10 h-10 w-10 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20 hover:shadow-cyber-blue transition-all duration-300"
              onClick={handleSwapTokens}
            >
              <ArrowDownUp className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="cyber-font text-sm font-medium text-cyber-purple">YOU RECEIVE</label>
              <span className="cyber-font text-xs text-muted-foreground">
                Balance: {swap.outputToken ? formatTokenAmount(swap.outputToken.balance) : '0'}
              </span>
            </div>
            
            <div className="flex gap-2">
              <Select
                value={swap.outputToken?.address}
                onValueChange={(value) => {
                  const token = portfolio.tokens.find(t => t.address === value);
                  setOutputToken(token || null);
                }}
              >
                <SelectTrigger className="w-[120px] cyber-font border-cyber-purple/30 bg-cyber-purple/5 text-white">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent className="cyber-glass-purple border-cyber-purple/30">
                  {portfolio.tokens.map((token) => (
                    <SelectItem key={token.address} value={token.address} className="cyber-font hover:bg-cyber-purple/10 focus:bg-cyber-purple/10">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-cyber-purple/20 animate-pulse-opacity"></div>
                          <img 
                            src={token.logoURI}
                            alt={token.symbol} 
                            className="w-4 h-4 rounded-full relative z-10" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/24/png";
                            }}
                          />
                        </div>
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="0.0"
                value={swap.outputAmount}
                readOnly
                className="flex-1 bg-cyber-purple/5 border-cyber-purple/30 text-white"
              />
            </div>
          </div>
          
          {parseFloat(swap.inputAmount) > 0 && (
            <div className="cyber-glass p-4 rounded-lg text-sm animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-cyber-blue" />
                <h3 className="cyber-font font-medium text-sm text-cyber-blue">SWAP DETAILS</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-cyber-blue/10">
                  <span className="cyber-font text-muted-foreground">Rate</span>
                  <span className="cyber-font">
                    1 {swap.inputToken?.symbol} = {(parseFloat(swap.outputAmount) / parseFloat(swap.inputAmount)).toFixed(6)} {swap.outputToken?.symbol}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-cyber-blue/10">
                  <span className="cyber-font text-muted-foreground">Slippage</span>
                  <span className="cyber-font">{slippageSetting}%</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-cyber-blue/10">
                  <span className="cyber-font text-muted-foreground">Network Fee</span>
                  <span className="cyber-font">~0.000005 SOL</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="cyber-font text-muted-foreground">Route</span>
                  <span className="cyber-font text-cyber-green">Jupiter Aggregator</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Button 
            className="w-full h-12 cyber-font text-base bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue/90 hover:to-cyber-purple/90 text-black font-medium shadow-cyber-blue hover:shadow-cyber-button transition-all duration-300"
            disabled={!parseFloat(swap.inputAmount) || !swap.inputToken || !swap.outputToken}
            onClick={executeSwap}
          >
            {parseFloat(swap.inputAmount) > 0 && swap.inputToken && swap.outputToken ? (
              <>
                <Rocket className="h-5 w-5 mr-2" />
                EXECUTE SWAP
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                ENTER AMOUNT
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Animated power indicator */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-cyber-blue text-xs animate-pulse-opacity">
          <Zap className="h-3 w-3" />
          <span className="cyber-font">POWERED BY JUPITER AGGREGATOR</span>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
