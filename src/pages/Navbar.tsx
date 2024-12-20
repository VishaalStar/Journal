import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { LogIn, Menu, ChevronRight, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { cn } from "@/lib/utils";

interface NavigationItemsProps {
  isScrolled: boolean;
  isMobile: boolean;
  handleNavigation: (page: string) => void;
  isLoggedIn: boolean;
  user: { avatarUrl: string; name: string }; // User object
  handleLogout: () => void;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({
  isScrolled,
  isMobile,
  handleNavigation,
  isLoggedIn,
  user,
  handleLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // Define state for dropdown visibility

  return (
    <NavigationMenuList
      className={cn(
        isMobile ? "flex flex-col space-y-4" : "space-x-8",
        "items-center"
      )}
    >
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
      {isLoggedIn ? (
        <NavigationMenuItem className="ml-4 relative">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown
          >
            <Avatar className="w-8 h-8 bg-rose-500">
              <AvatarImage src={user.avatarUrl} alt={user.name || "User Avatar"} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-800">{user.name}</span>
          </Button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
              <button
                onClick={() => handleNavigation('Profile')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Profile
              </button>
              <button
                onClick={() => handleNavigation('Settings')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Log Out
              </button>
            </div>
          )}
        </NavigationMenuItem>
      ) : (
        <NavigationMenuItem className="ml-4">
          <Button
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              isScrolled
                ? "bg-rose-500/80 hover:bg-rose-600/90 text-white shadow-md hover:shadow-lg"
                : "bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:shadow-lg"
            )}
            onClick={() => handleNavigation('Signup')}
          >
            <LogIn className="w-4 h-4" />
            Signup/Login
            <ChevronRight className="w-4 h-4" />
          </Button>
        </NavigationMenuItem>
      )}
    </NavigationMenuList>
  );
};

const Navbar: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ avatarUrl: "", name: "" });

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    // Check if the user is already authenticated when the component mounts
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser({
          avatarUrl: currentUser.photoURL || "",
          name: currentUser.displayName || "User",
        });
      } else {
        setIsLoggedIn(false);
        setUser({ avatarUrl: "", name: "" });
      }
    });
  }, [auth]);

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'Journal':
        navigate("/journal");
        break;
      case 'Gallery':
        navigate("/gallery");
        break;
      case 'Map':
        navigate("/map");
        break;
      case 'Profile':
        navigate("/profile"); // Navigate to profile page
        break;
      case 'Settings':
        navigate("/settings"); // Navigate to settings page
        break;
      case 'Signup':
        navigate("/signup");
        break;
      default:
        break;
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full h-16 z-50 transition-all duration-300",
        isScrolled ? "bg-white/30 backdrop-blur-md border-b border-white/20" : "bg-black/5 backdrop-blur-sm"
      )}
    >
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
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
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
                    isLoggedIn={isLoggedIn}
                    user={user}
                    handleLogout={handleLogout}
                  />
                </NavigationMenu>
                <Button
                  className="w-full bg-rose-500/80 hover:bg-rose-600/90 text-white mt-4 shadow-md hover:shadow-lg"
                  onClick={handleLogin}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
