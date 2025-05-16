
import './polyfills'; // Must be the first import
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/cyberpunk-theme.css'; // Import cyberpunk theme
import WalletConnectionProvider from './context/WalletConnectionProvider';
import { CivicAuthProvider } from "@civic/auth/react";
import ErrorBoundary from './components/Auth/ErrorBoundary';

// Use the actual Civic Client ID
const CIVIC_CLIENT_ID = "b8b65720-c7de-4935-b638-1b58cff8cd87"; 

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <CivicAuthProvider 
      clientId={CIVIC_CLIENT_ID} 
      displayMode="redirect" // Use redirect mode instead of iframe
    >
      <WalletConnectionProvider>
        <App />
      </WalletConnectionProvider>
    </CivicAuthProvider>
  </ErrorBoundary>
);
