
import React, { ReactNode, useEffect } from "react";
import CivicAuth from "../Auth/CivicAuth";
import { 
  AtomIcon, 
  CircleDollarSign, 
  GalleryHorizontal, 
  Send, 
  ArrowRightLeft, 
  Star,
  UserCircle,
  Zap,
  BookUser,
  Database,
  Terminal,
  Layers,
  Droplets,
  Wallet,
  BarChart3,
  Cpu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Force dark mode for cyberpunk theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  // Nav items for the sidebar
  const navItems = [
    { title: "Dashboard", path: "/", icon: Zap },
    { title: "Wallet", path: "/wallet", icon: Wallet },
    { title: "Swap", path: "/swap", icon: ArrowRightLeft },
    { title: "Transfer", path: "/transfer", icon: Send },
    { title: "NFTs", path: "/nfts", icon: GalleryHorizontal },
    { title: "Liquidity", path: "/liquidity", icon: Droplets },
    { title: "Staking", path: "/staking", icon: Star },
    { title: "Analytics", path: "/analytics", icon: BarChart3 },
    { title: "Terminal", path: "/terminal", icon: Terminal },
    { title: "Profile", path: "/profile", icon: UserCircle },
  ];
  
  // Function to determine navigation class based on active state
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-all duration-300 ${
      isActive 
        ? "bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-cyber-blue" 
        : "text-muted-foreground hover:bg-cyber-blue/10 hover:text-cyber-blue hover:shadow-cyber-blue"
    }`;
  };
  
  return (
    <SidebarProvider>
      {/* Circuit pattern background with overlay */}
      <div className="fixed inset-0 cyber-circuit-bg opacity-10 pointer-events-none z-0"></div>
      
      <div className="flex min-h-screen bg-cyber-darker relative overflow-hidden">
        {/* Animated particle effects */}
        <div className="cyber-particles">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-cyber-blue/5 rounded-full filter blur-3xl animate-pulse-opacity"></div>
          <div className="absolute bottom-40 right-1/3 w-40 h-40 bg-cyber-purple/5 rounded-full filter blur-3xl animate-pulse-opacity" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-cyber-pink/5 rounded-full filter blur-3xl animate-pulse-opacity" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <Sidebar className="hidden md:flex w-72 border-r border-cyber-blue/20 backdrop-blur-md p-4 bg-cyber-dark-blue/50 z-10">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex justify-between items-center">
              <h1 className="cyber-font font-bold text-xl bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text animate-text-glow-blue">
                SOLANA NEXUS
              </h1>
              <SidebarTrigger className="text-cyber-blue hover:text-cyber-blue/80 transition-colors" />
            </div>
            
            <div className="mb-4 animate-fade-in">
              <CivicAuth />
            </div>
            
            <SidebarContent>
              <div className="cyber-font text-xs text-cyber-blue font-medium uppercase tracking-wider mb-2 animate-text-glow-blue">
                NAVIGATION
              </div>
              <SidebarMenu className="space-y-1.5">
                {navItems.map((item, index) => (
                  <SidebarMenuItem key={item.path} className="animate-slide-in-left" style={{ animationDelay: `${index * 0.05}s` }}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        className={getNavClass}
                        end={item.path === "/"}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="cyber-font">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            
            <div className="mt-auto flex items-center justify-between border-t border-cyber-blue/20 pt-4">
              <div className="flex gap-2">
                <ModeToggle />
                <Button variant="outline" size="icon" asChild className="w-9 h-9 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 hover:shadow-cyber-blue">
                  <a 
                    href="https://solana.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs"
                  >
                    <BookUser className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-cyber-blue animate-pulse-opacity">
                <Cpu className="h-3 w-3" />
                <span className="cyber-font">MAINNET</span>
              </div>
            </div>
          </div>
        </Sidebar>
        
        <div className="flex flex-col flex-1 relative z-10">
          <header className="border-b border-cyber-blue/20 backdrop-blur-md sticky top-0 z-20 bg-cyber-darker/80">
            <div className="container flex justify-between items-center py-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden text-cyber-blue" />
                <h1 className="cyber-font font-bold text-xl md:hidden bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text animate-text-glow-blue">
                  SOLANA NEXUS
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-cyber-blue text-xs animate-cyber-glow-blue">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"></div>
                  <span className="cyber-font">MAINNET CONNECTED</span>
                </div>
                <CivicAuth className="hidden sm:flex" />
                <ModeToggle />
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <div className="container">
              {children}
            </div>
          </main>
          
          <footer className="border-t border-cyber-blue/20 py-4 backdrop-blur-md bg-cyber-darker/80">
            <div className="container text-center text-sm text-cyber-blue">
              <p className="flex items-center justify-center gap-2">
                <AtomIcon className="h-3 w-3 text-cyber-blue animate-rotate-slow" />
                <span className="cyber-font">POWERED BY SOLANA BLOCKCHAIN</span>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
