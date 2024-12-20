import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { LogIn, Menu, ChevronRight, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import ShadCN Avatar components
import { cn } from "@/lib/utils";
import { SignupFormDemo } from './SignupForm';
import MapUI from './MapUI';

interface NavigationItemsProps {
  isScrolled: boolean;
  isMobile: boolean;
  handleNavigation: (page: string) => void;
  isLoggedIn: boolean;
  handleLogout: () => void; // Function to handle logout
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ isScrolled, isMobile, handleNavigation, isLoggedIn, handleLogout }) => (
  <NavigationMenuList className={cn(isMobile ? "flex flex-col space-y-4" : "space-x-8", "items-center")}>
    {['Journal', 'Gallery', 'Map'].map((item) => (
      <NavigationMenuItem key={item} className="mx-2">
        <NavigationMenuLink
          className={cn(
            "font-sans transition-all duration-300 cursor-pointer relative group",
            isMobile ? "text-gray-900 text-lg" : isScrolled ? "text-gray-800 hover:text-rose-500" : "text-white hover:text-rose-300",
            "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5",
            isScrolled ? "after:bg-rose-500" : "after:bg-white",
            "after:transition-all after:duration-300 hover:after:w-full"
          )}
          onClick={() => handleNavigation(item)}
        >
          {item}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ))}
    {/* Show Avatar if logged in */}
    {isLoggedIn ? (
      <NavigationMenuItem className="ml-4">
        <Button variant="ghost" onClick={handleLogout}>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://your-image-url.com" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <LogOut className="ml-2" />
        </Button>
      </NavigationMenuItem>
    ) : (
      <NavigationMenuItem className="ml-4">
        <a href="/signup">
          <Button
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              isScrolled
                ? "bg-rose-500/80 hover:bg-rose-600/90 text-white shadow-md hover:shadow-lg"
                : "bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:shadow-lg"
            )}
          >
            <LogIn className="w-4 h-4" />
            Signup/Login
            <ChevronRight className="w-4 h-4" />
          </Button>
        </a>
      </NavigationMenuItem>
    )}
  </NavigationMenuList>
);

const Navbar: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'Journal':
        navigate("/journal"); // Navigate to JournalPage
        break;
      case 'Gallery':
        navigate("/gallery"); // Navigate to GalleryPage (ensure this route exists)
        break;
      case 'Map':
        navigate("/map"); // Navigate to MapPage
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // Logout user and reset login state
  };

  return (
    <nav className={cn(
      "fixed w-full h-16 z-50 transition-all duration-300",
      isScrolled ? "bg-white/30 backdrop-blur-md border-b border-white/20" : "bg-black/5 backdrop-blur-sm"
    )}>
      <div className="container h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="mb-6 flex justify-center items-center p-4 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-red-400 to-pink-400">
            𝓣𝓻𝓪𝓿𝓮𝓵 𝓙𝓸𝓾𝓻𝓷𝓪𝓵
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationItems
                isScrolled={isScrolled}
                isMobile={false}
                handleNavigation={handleNavigation}
                isLoggedIn={isLoggedIn}  // Pass the login state
                handleLogout={handleLogout}  // Pass the logout handler
              />
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden",
                  isScrolled ? "text-gray-800 hover:text-rose-500" : "text-white hover:text-rose-300"
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6 bg-white/60 backdrop-blur-xl">
              <SheetTitle className="text-2xl font-sans text-gray-800 mb-4">Menu</SheetTitle>
              <nav className="flex flex-col gap-6 mt-8">
                <NavigationMenu orientation="vertical" className="w-full">
                  <NavigationItems
                    isScrolled={true}
                    isMobile={true}
                    handleNavigation={handleNavigation}
                    isLoggedIn={isLoggedIn}  // Pass the login state
                    handleLogout={handleLogout}  // Pass the logout handler
                  />
                </NavigationMenu>
                <a href="/signup">
                  <Button className="w-full bg-rose-500/80 hover:bg-rose-600/90 text-white mt-4 shadow-md hover:shadow-lg">
                    <LogIn className="mr-2 h-4 w-4" />
                    Signup/Login
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
