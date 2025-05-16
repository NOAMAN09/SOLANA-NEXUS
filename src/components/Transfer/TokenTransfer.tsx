
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSolanaStore } from "@/store/solanaStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatTokenAmount } from "@/utils/formatters";
import { ArrowRight } from "lucide-react";
import { useTransactionHelpers } from "@/utils/solanaTransactions";
import { useUser } from "@civic/auth/react";

const TokenTransfer: React.FC = () => {
  const { toast } = useToast();
  const { portfolio } = useSolanaStore();
  const { user } = useUser();
  const [selectedToken, setSelectedToken] = useState(portfolio.tokens[0]?.address || "");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  
  const selectedTokenInfo = portfolio.tokens.find(token => token.address === selectedToken);
  const { executeTransfer, canSign } = useTransactionHelpers();
  
  const handleTransfer = async () => {
    if (!user) {
      toast({
        title: "Not signed in",
        description: "Please sign in with Civic to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (!canSign) {
      toast({
        title: "Cannot sign transactions",
        description: "Your connected account doesn't support transaction signing",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedToken) {
      toast({
        title: "No token selected",
        description: "Please select a token to transfer",
        variant: "destructive",
      });
      return;
    }
    
    if (!recipientAddress) {
      toast({
        title: "Invalid recipient",
        description: "Please enter a valid recipient address",
        variant: "destructive",
      });
      return;
    }
    
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to transfer",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedTokenInfo && transferAmount > selectedTokenInfo.balance) {
      toast({
        title: "Insufficient funds",
        description: `You don't have enough ${selectedTokenInfo.symbol} tokens`,
        variant: "destructive",
      });
      return;
    }
    
    setIsTransferring(true);
    
    try {
      const signature = await executeTransfer(
        selectedToken, 
        recipientAddress, 
        transferAmount
      );
      
      toast({
        title: "Transfer successful",
        description: `Successfully transferred ${amount} ${selectedTokenInfo?.symbol || "tokens"} to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-6)}. Signature: ${signature.slice(0, 8)}...`,
      });
      
      setAmount("");
      setRecipientAddress("");
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast({
        title: "Transfer failed",
        description: error?.message || "Something went wrong with your transfer",
        variant: "destructive",
      });
    } finally {
      setIsTransferring(false);
    }
  };
  
  const handleMaxAmount = () => {
    if (selectedTokenInfo) {
      setAmount(selectedTokenInfo.balance.toString());
    }
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Transfer Tokens</CardTitle>
        <CardDescription>Send tokens to another wallet address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Select
            value={selectedToken}
            onValueChange={setSelectedToken}
          >
            <SelectTrigger id="token" className="w-full">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {portfolio.tokens.map((token) => (
                <SelectItem key={token.address} value={token.address} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {token.logoURI && (
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/solana-labs/token-list@main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
                        }}
                      />
                    )}
                    <span>{token.symbol}</span>
                    <span className="text-muted-foreground text-xs">
                      (Balance: {formatTokenAmount(token.balance)})
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedTokenInfo && (
            <p className="text-xs text-muted-foreground mt-1">
              Available: {formatTokenAmount(selectedTokenInfo.balance)} {selectedTokenInfo.symbol}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="Enter Solana address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="amount">Amount</Label>
            {selectedTokenInfo && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs h-6 px-2"
                onClick={handleMaxAmount}
              >
                MAX
              </Button>
            )}
          </div>
          <Input
            id="amount"
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="any"
            min="0"
          />
        </div>
        
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div>
            <p className="text-sm font-medium">Network Fee</p>
            <p className="text-xs text-muted-foreground">~0.000005 SOL</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="text-right">
            <p className="text-sm font-medium">You'll send</p>
            <p className="text-xs text-muted-foreground">
              {amount ? `${amount} ${selectedTokenInfo?.symbol || "tokens"}` : "0"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-solana-primary hover:bg-solana-primary/90"
          onClick={handleTransfer}
          disabled={!user || !canSign || isTransferring || !amount || !recipientAddress || !selectedToken}
        >
          {isTransferring ? "Processing..." : "Transfer Tokens"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenTransfer;
