import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/memories");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-black dark:text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section
        className="w-full relative text-white min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center px-6 shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl  tracking-tight leading-tight drop-shadow-md">
            🎓 Apne College Ke Golden Din...
          </h1>
          <p className="mt-6 text-lg md:text-xl italic max-w-2xl mx-auto opacity-90">
            “Marks bhool jaate hain, lekin dosti aur masti... woh dil mein reh
            jaati hai.”
          </p>
          <Button
            onClick={handleClick}
            className="mt-8 text-base sm:text-lg rounded-full px-6 py-3 bg-white text-black hover:bg-gray-200 transition duration-300 shadow"
          >
            Start Your Memory Walk
          </Button>
        </div>
      </section>

      {/* Memory Cards Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-5xl  flex justify-center items-center gap-3 text-black dark:text-white mb-20">
          Hey {userData ? userData.name : "Dev"}{" "}
        </h1>

        <h2 className="text-3xl text-center mt-4 mb-12 dark:text-gray-600">
          📚 Yaadon Ke Panne
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "🏠 Hostel Life",
              content:
                "Raat ke 2 baje wali maggi, bina reason wali hasi, aur woh dosti jo zindagi bhar saath chalegi...",
            },
            {
              title: "🍽 Canteen Chronicles",
              content:
                "Ek plate chowmein, 5 dost, aur endless laughter — yaadein taste se zyada gehri hoti thi.",
            },
            {
              title: "🪑 Last Bench Legends",
              content:
                "Waha lectures nahi, dosti hoti thi. Har plan, har masti wahi se shuru hoti thi.",
            },
          ].map((card, i) => (
            <Card key={i} className="shadow-xl bg-white dark:bg-[#1c1c1f]">
              <CardHeader>
                <CardTitle className="text-indigo-700 dark:text-indigo-400 text-xl text-center">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  {card.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full py-20 px-6">
        <h2 className="text-3xl text-center mb-12 text-gray-800 dark:text-gray-600 ">
          💬 Batchmate's View...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Sakshi Jain",
              text: "Canteen ki chai aur doston ki gossip — best combo ever!",
            },
            {
              name: "Aman Verma",
              text: "Hostel ki raatein aur ek dusre ki leg pulling — golden memories!",
            },
            {
              name: "Ritika Sharma",
              text: "Classroom ke bahar wali baatein, sabse special hoti thi!",
            },
          ].map((t, i) => (
            <Card key={i} className="shadow-xl bg-white dark:bg-[#1c1c1f]">
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center italic">
                  “{t.text}”
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  — {t.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Moj Masti Dialogues */}
      <section className="w-full bg-white dark:bg-[#121212] py-20 px-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-10">
          🎉 Moj Masti Recap
        </h2>
        <div className="max-w-2xl mx-auto text-center space-y-4 text-gray-700 dark:text-gray-300 text-lg italic">
          <p>“Aaj lecture lena mana hai sir, dard ho raha hai dosti mein!”</p>
          <p>“Bhai proxy maar dena, aaj neend aa rahi hai 😴”</p>
          <p>“Tu chal, baaki sab ho jaayega...”</p>
          <p>“Canteen ke samose se zyada spicy to teri gossip hoti hai!”</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#1a1a1a] w-full">
        <p>© {new Date().getFullYear()} ABESEC | Yaadon Ka Pitara ❤️</p>
      </footer>
    </div>
  );
};

export default Home;
