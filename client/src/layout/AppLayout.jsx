import MusicPlayer from "@/components/MusicPlayer";
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
      <MusicPlayer />
    </div>
  );
};

export default AppLayout;
