
import React from "react";
import { useUser } from "@civic/auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, UserCog } from "lucide-react";

const Profile: React.FC = () => {
  const { user, signIn, signOut } = useUser();
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to view your profile</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => signIn()}>Sign In with Civic</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal information from Civic Auth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.picture} alt={user.name || "User"} />
                <AvatarFallback>
                  {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="text-xl font-medium">{user.name}</h3>
                {user.email && <p className="text-muted-foreground">{user.email}</p>}
              </div>
            </div>
            
            <div className="grid gap-2">
              {user.given_name && (
                <div>
                  <span className="font-medium">First Name:</span> {user.given_name}
                </div>
              )}
              
              {user.family_name && (
                <div>
                  <span className="font-medium">Last Name:</span> {user.family_name}
                </div>
              )}
              
              <div>
                <span className="font-medium">User ID:</span> {user.id}
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button onClick={() => signOut()} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Link Accounts</CardTitle>
            <CardDescription>Connect your Solana wallet with your Civic identity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Linking your accounts allows you to use your Civic identity across the Solana ecosystem securely.
            </p>
            
            {/* This would be implemented when you have the actual wallet linking functionality */}
            <Button variant="outline" className="w-full">
              <UserCog className="h-4 w-4 mr-2" />
              Link Wallet to Civic Identity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
