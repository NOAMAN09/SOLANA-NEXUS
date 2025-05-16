
import React from "react";
import { useUser } from "@civic/auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import ErrorBoundary from "./ErrorBoundary";

interface CivicAuthProps {
  className?: string;
}

const CivicAuth: React.FC<CivicAuthProps> = ({ className }) => {
  const { user, signIn, signOut, authStatus } = useUser();

  const handleSignIn = () => {
    try {
      signIn("redirect"); // Explicitly specify redirect mode
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = () => {
    try {
      signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const isLoading = authStatus === "authenticating" || authStatus === "signing_out";

  return (
    <ErrorBoundary>
      <div className={`flex items-center gap-2 ${className}`}>
        {!user && (
          <Button 
            onClick={handleSignIn} 
            variant="outline" 
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        )}

        {user && (
          <div className="flex items-center gap-2">
            <div className="text-sm">
              <span className="font-medium">{user.name}</span>
            </div>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default CivicAuth;
