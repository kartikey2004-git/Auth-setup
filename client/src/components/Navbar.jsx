import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsloggedIn } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      data.success && setIsloggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = () => {
    navigate("/")
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-[#121212] shadow-md px-4 sm:px-8 py-3 flex items-center justify-between">
      

      <div 
      onClick={handleClick}
      className="flex items-center gap-4 cursor-pointer">
        {/* College Logo */}
        <img
          src="/abess.png"
          alt="ABES Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md"
        />

        {/* Title with Style */}
        <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400 bg-clip-text">
          ABESEC —{" "}
          <span className="text-pink-600 dark:text-pink-400">ECE Memories</span>
        </h1>
      </div>

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}

          <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-10 text-black">
            <ul className="list-none m=0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify email
                </li>
              )}

              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Button
          className="flex items-center gap-2 text-sm sm:text-base rounded-full px-5 sm:px-6 py-2"
          onClick={() => navigate("/login")}
        >
          Login <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
