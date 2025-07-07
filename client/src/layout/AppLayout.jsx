import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />

        {/* Body */}
        <Outlet />
      </main>
      <MusicPlayer />
    </div>
  );
};

export default AppLayout;
