import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import { Sparkles } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    src: "/blog.jpeg",
    title: "We once survived",
    text: "Search for future layer still pressing among us...",
  },
  {
    src: "/card2.jpg",
    title: "Code survived",
    text: "Lorem Ipsum has been the industry's standard...",
  },
  {
    src: "/card3.jpg",
    title: "Not only fire",
    text: "Not only fire obstacles, the system lived...",
  },
];

const Home = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/memories");
  // };

  return (
    <div className="items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-black dark:text-white font-sans">
      <Navbar />

      <section className="hidden lg:block relative w-full h-screen mt-16 overflow-hidden bg-[#1a1a1a] text-white">
        <div className="absolute inset-0 bg-[url('abes2.png')] bg-cover bg-center opacity-100" />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

        <div className="relative z-10 flex h-full">
          <div className="flex flex-col justify-between flex-1">
            <div
              className="flex flex-col md:flex-row items-center justify-between
  bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl shadow-xl
  px-10 py-16 md:py-20 md:px-16 space-y-10 md:space-y-0 md:space-x-12
  max-w-5xl mx-auto mb-4 mt-6 ml-4"
            >
              {/* 🕸️ Heading */}
              <div className="flex flex-col items-center justify-center text-center space-y-6 w-full">
                {/* 🕸️ Heading */}
                <h1 className="whitespace-nowrap text-3xl sm:text-5xl font-semibold text-white drop-shadow-lg">
                  <span className="text-red-500 animate-pulse text-5xl">
                    🕸️
                  </span>{" "}
                  College Ke Golden Din..
                </h1>

                {/* 🧵 Quote */}
                <p className="whitespace-nowrap text-lg sm:text-xl italic text-gray-200">
                  “Woh dosti, woh masti, woh yaadein — ek invisible web
                  jaisi...”
                </p>

                {/* 🧑‍🎓 Greeting */}

                {/* 🧠 Description */}
                <p className="whitespace-nowrap text-base sm:text-lg text-gray-300 font-medium">
                  From last bench plans to canteen chaos — chhodo un yaadon ka
                  web yahaan.
                </p>

                {/* 🧶 Tagline */}
                <p className="whitespace-nowrap text-sm sm:text-base text-gray-400 italic">
                  “Har yaad, ek web hai. Dil se judi hui.”
                </p>
              </div>
            </div>

            <div className="pb-10 px-6">
              <div className="flex justify-center gap-6 flex-wrap">
                {cards.map((card, i) => (
                  <article
                    key={i}
                    className="relative flex-1 min-w-[250px] max-w-sm p-5 rounded-xl border border-white/15 backdrop-blur-md bg-white/10 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <img
                      src={card.src}
                      alt=""
                      className="w-full h-36 rounded-md object-cover mb-4"
                    />
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {card.text}
                    </p>

                    <span className="absolute top-3 right-3 text-red-400">
                      🕸
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-[30%] min-w-[300px] flex items-end justify-end pointer-events-none select-none">
            <section className="relative w-full h-screen overflow-hidden text-white mt-16">
              {/* Background image */}
              <div className="absolute inset-0 bg-[url('/spidy.png')] bg-cover bg-center z-0" />


              <h1 className="text-4xl  mt-40 font-bold text-center">
                Hey {userData ? userData.name : "Dev"}!
                <span className=""> wassup...🕷️</span>
              </h1>
            </section>
          </div>
        </div>
      </section>

      <section className="block lg:hidden relative w-full min-h-screen mt-16 text-white overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-[url('/abes2.png')] bg-cover bg-center z-0" />

        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 bg-white/10 backdrop-blur-md border border-white/15 space-y-8 mt-32">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight drop-shadow-lg">
            <span className="text-red-500 animate-pulse mr-2 text-4xl">🕸️</span>
            College Ke Golden Din..
          </h1>

          {/* Quote */}
          <p className="text-base sm:text-lg text-gray-300 italic max-w-md">
            “Woh <span className="text-white font-semibold">dosti</span>, woh{" "}
            <span className="text-white font-semibold">masti</span>, woh yaadein
            — ek invisible web jaisi…”
          </p>

          {/* Greeting */}
          <h2 className="text-lg sm:text-xl font-semibold">
            Hey {userData ? userData.name : "Dev"}{" "}
            <span className="text-red-500">🕷️</span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-300 max-w-sm">
            From last‑bench plans to canteen chaos — chhodo un yaadon ka web
            yahaan.
          </p>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-gray-400 italic">
            “Har yaad, ek web hai. Dil se judi hui.”
          </p>
        </div>
      </section>

      <section className="relative w-full py-24 bg-[#0d0d10] text-white">
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
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
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#web)" />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-semibold">
            🕷 About <span className="text-red-500">ABES‑EC Memories</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 leading-relaxed">
            This zone is yours to fill—drop a short origin story, add a
            secondary hero image, or embed a comic‑style timeline of campus
            highlights. Keep it heroic!
          </p>
          <button
            onClick={() => navigate("/memories")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md  font-bold shadow-lg transition"
          >
            View Memories or Upload
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl sm:text-4xl text-center mb-14 text-red-500 font-semibold">
          🕸️ YaadonKePanne
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "🏠 Hostel Life",
              content:
                "Raat ke 2 baje wali maggi, bina reason wali hasi, aur woh dosti jo zindagi bhar saath chalegi…",
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
            {
              title: "🎮 LAN Party Memories",
              content:
                "Counter Strike aur NFS ke tournament—hostel rooms ka asli battlefield wahi banta tha.",
            },
            {
              title: "🎤 Fresher's Vibes",
              content:
                "Stage par chadhne ka darr, aur sabke beech dance karne ka thrill—unforgettable!",
            },
            {
              title: "📸 Group Photo Saga",
              content:
                "Class ke end mein har koi photo mein aana chahta tha… memories freeze-frame ho jaati thi!",
            },
          ].map((card, i) => (
            <article
              key={i}
              className="relative min-h-[220px] flex flex-col justify-between p-6 rounded-2xl border border-red-400/20 bg-[#1a1a1d]/80 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <h3 className="text-xl font-bold mb-2 text-white">
                {card.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {card.content}
              </p>
              <span className="absolute top-4 right-4 text-red-500 text-lg">
                🕸️
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full py-24 px-6 bg-[#111317]">
        <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-12 text-blue-500 drop-shadow">
          🕷 Batchmates’ View
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
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
            {
              name: "Rohit Chauhan",
              text: "Exam ke baad ka Chatori Gali trip — bhool hi nahi sakte!",
            },
            {
              name: "Shruti Nair",
              text: "Cultural fest mein Spider-Man ban ke photo kheechwaya tha 😄",
            },
            {
              name: "Manav Joshi",
              text: "ABES ke canteen wali cold coffee > Starbucks forever!",
            },
          ].map((card, i) => (
            <article
              key={i}
              className="relative min-h-[180px] flex flex-col justify-between p-6 rounded-2xl border border-blue-400/20 bg-[#1c1e22]/80 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <h3 className="text-white font-bold text-lg mb-2">{card.name}</h3>
              <p className="text-white/80 text-sm leading-relaxed italic">
                “{card.text}”
              </p>
              <span className="absolute top-4 right-4 text-blue-400 text-lg">
                🕷️
              </span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="relative w-full min-h-[600px] flex items-center justify-center text-center overflow-hidden bg-black"
        style={{
          backgroundImage: `url("blog.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay with blur */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-white space-y-10 px-6 py-10">
          {/* Sparkles or web icon */}
          <div className="flex justify-center">
            <Sparkles className="w-10 h-10 text-red-500 animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold drop-shadow-md">
            🕸️ Relive <span className="">Your</span>{" "}
            <span className="">ABES‑EC</span> Moments
          </h2>

          {/* Quote */}
          <p className="text-lg md:text-xl italic text-gray-300 max-w-3xl mx-auto leading-relaxed">
            “Woh <span className="">last‑bench</span> ki hasi, assignments ke
            dinon ki <span className="font-semibold">dosti</span>, aur{" "}
            <span className="font-semibold">campus ke lamhe</span> — sab yaadein
            <span className="font-semibold"> likh daal yahaan!</span>” 🕸️
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/blogs")}
            className="bg-red-500 hover:bg-blue-600 text-white  text-lg  px-10 py-3 rounded-full shadow-xl hover:scale-105 transition duration-300"
          >
            ✍️ Write Your Memory Now
          </button>

          {/* Footer note */}
          <p className="text-lg text-gray-400">
            Every story deserves its web — leave yours here.
          </p>
        </div>
      </section>

      <section className="w-full bg-white dark:bg-[#121212] py-24 px-6 relative overflow-hidden">
        <div
          className="
    absolute inset-0 z-0
    bg-[url('/spidy.png')] bg-center bg-contain bg-no-repeat pointer-events-none
    opacity-30
    blur-sm           
    sm:blur-none     
  "
        />

        <div className="flex items-center justify-center mb-16">
          <span className="text-4xl sm:text-5xl text-red-500 animate-bounce mr-4">
            🕷️
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-red-600 dark:text-red-400 drop-shadow-lg">
            Moj Masti Recap
          </h2>
        </div>

        {/* Quotes Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 gap-x-96 z-10 relative">
          {[
            "Aaj lecture lena mana hai sir, dard ho raha hai dosti mein!",
            "Bhai proxy maar dena, aaj neend aa rahi hai 😴",
            "Tu chal, baaki sab ho jaayega...",
            "Canteen ke samose se zyada spicy to teri gossip hoti hai!",
            "Assignment kal submit karwa denge, aaj FIFA chahiye bro.",
            "Project toh ban jaayega, pehle terrace wali party!",
          ].map((line, i) => (
            <div
              key={i}
              className="bg-red-50 dark:bg-[#1f1f1f] border-l-4 border-red-400 text-gray-800 dark:text-gray-200 px-6 py-5 rounded-lg shadow hover:scale-[1.02] transition-all duration-200"
            >
              <p className="italic text-base leading-relaxed">
                “
                <span className="text-red-600 dark:text-red-400 font-medium">
                  {line}
                </span>
                ”
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Web Icon or Spidey Emoji */}
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#1a1a1a] w-full">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-black dark:text-white">
            ABES‑EC
          </span>{" "}
          |
          <span className="text-red-500 font-medium text-xl ml-1">
            Yaadon Ka Pitara 🕷️❤️
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Home;
