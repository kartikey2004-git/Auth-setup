import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen mx-auto">
        <Navbar />
        {/* Body */}
        <Outlet />
      </main>
      
      <footer className="text-center py-8 text-sm text-gray-500 flex justify-center dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#1a1a1a] w-full">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-black dark:text-white">
            ABES‑EC
          </span>
          <span className="text-red-500 font-medium text-xl ml-1">
            Yaadon Ka Pitara 🕷️❤️
          </span>
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
