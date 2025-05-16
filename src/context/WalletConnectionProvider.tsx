
import React from "react";

interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

// This is now just a passthrough component that doesn't provide any wallet functionality
const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default WalletConnectionProvider;
