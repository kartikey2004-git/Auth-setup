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

  const handleError = (error) => {
    toast.error(error?.response?.data?.message || error.message);
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`
      );

      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        setIsloggedIn(false);
        setUserData(null); // changed from false
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 px-4 sm:px-8 py-3 flex items-center justify-between bg-[#0c0c0d] shadow-lg backdrop-blur-lg border-b border-red-500/20">
      {/* 🕸️ Subtle Web Pattern Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="web"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0 L80 80 M80 0 L0 80 M40 0 L40 80 M0 40 L80 40"
              stroke="#f87171"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#web)" />
      </svg>

      {/* 🔥 Logo & Title */}
      <div
        onClick={handleClick}
        className="flex items-center gap-4 z-10 cursor-pointer"
      >
        <img
          src="/abess.png"
          alt="ABES Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md"
        />
        <h1 className="text-lg sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow">
          ABESEC <span className="opacity-80">— ECE Memories</span>
        </h1>
      </div>

      {/* 🧑‍💻 Right Side Auth */}
      <div className="z-10">
        {userData ? (
          <div className="relative group">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 text-white font-semibold cursor-pointer hover:scale-105 transition">
              {userData.name[0].toUpperCase()}
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg hidden group-hover:block z-20">
              <ul className="text-sm py-2">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Verify Email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Button
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2 text-sm sm:text-base font-medium flex items-center gap-2 transition"
            onClick={() => navigate("/login")}
          >
            Login <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
