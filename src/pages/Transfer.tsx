
import React from "react";
import TokenTransfer from "@/components/Transfer/TokenTransfer";
import { useUser } from "@civic/auth/react";

const Transfer: React.FC = () => {
  const { user } = useUser();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transfer Tokens</h1>
      
      {user ? (
        <TokenTransfer />
      ) : (
        <div className="flex justify-center">
          <div className="bg-muted/50 p-10 rounded-lg text-center w-full max-w-md">
            <p>Please sign in with Civic to transfer tokens</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfer;
