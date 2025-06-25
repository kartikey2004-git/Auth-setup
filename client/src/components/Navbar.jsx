import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-between items-center px-4 py-3 sm:px-24 sm:py-5 fixed top-0 left-0 z-50 bg-background text-foreground shadow-md">
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="h-28 sm:h-28 object-contain"
      />
      
      <Button className="flex items-center gap-2 text-sm sm:text-base rounded-full px-5 sm:px-6 py-2" onClick={() => navigate("/login")}>
        Login <ArrowRight className="w-4 h-4"/>
      </Button>
    </div>
  );
};

export default Navbar;
