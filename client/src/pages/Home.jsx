import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { Handshake } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const {userData} = useContext(AppContext)

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/memories")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <section className="flex justify-center items-center min-h-screen px-4 sm:px-24 bg-background text-foreground">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold flex justify-center items-center gap-3">
            Hey {userData ? userData.name: 'Dev'} <Handshake className="w-7 h-7 text-primary aspect-square" />
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold">
            Welcome to our app
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Let&apos;s start with a quick product tour and we&apos;ll have you up and
            running in no time.
          </p>

          <Button
            onClick={handleClick}
            size="lg"
            className="px-6 py-3 text-base sm:text-lg rounded-full"
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;