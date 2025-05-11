"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { Button } from "../ui/button";
import { Leaf, User } from "lucide-react";
import { useLogout } from "@/lib/logout";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // ✅ new state
  const [hasMounted, setHasMounted] = useState(false);

  
  const router = useRouter();

  const logout = useLogout();

  useEffect(() => {
  const updateAuthState = () => {
    const token = Cookies.get("token");
    const name = Cookies.get("userName");
    setIsLoggedIn(!!token);
    setUsername(name || "");
  };

  setHasMounted(true);
  updateAuthState(); // run initially

  window.addEventListener("authChanged", updateAuthState); // ✅ listen for changes

  return () => {
    window.removeEventListener("authChanged", updateAuthState); // ✅ cleanup
  };
}, []);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <nav className={`relative w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-plant-500" />
          <span className="text-xl font-semibold text-plant-800">PlantGuard AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-plant-800 hover:text-plant-600 transition-colors">How it Works</a>
          <a href="#features" className="text-plant-800 hover:text-plant-600 transition-colors">Features</a>
          <a href="#get-started" className="text-plant-800 hover:text-plant-600 transition-colors">Get Started</a>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            onClick={() => {
              const token = Cookies.get("token");
              if (!token) {
                router.push("/login"); // or show login prompt
              } else {
                router.push("/dashboard");
              }
            }}
          >
            Try Demo
          </Button>

          {hasMounted && (
  isLoggedIn ? (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-plant-800 hidden md:inline">Hi, {username}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 p-0">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="User" />
              <AvatarFallback className="bg-plant-100">
                <User className="h-5 w-5 text-plant-500" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
      <div className="flex gap-2">
        <Button onClick={handleLoginRedirect} variant="outline">
          Login
        </Button>
        <Button onClick={handleRegisterRedirect} variant="outline">
          Register
        </Button>
      </div>
        )
      )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
