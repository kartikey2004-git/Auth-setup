import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { AppContext } from "@/context/AppContext";
import { Sparkles } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const allCards = [
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
  {
    src: "/card2.jpg",
    title: "Code survived",
    text: "Lorem Ipsum has been the industry's standard...",
  },
];

const memoryCards = [
  {
    title: "🏠 Hostel Life",
    content:
      "2am wali maggi, bina wajah wali hasi, aur woh dosti jo zindagi bhar saath chalegi.",
  },
  {
    title: "🍽 Canteen Chronicles",
    content:
      "Ek plate chowmein, 5 dost, aur endless laughter — yaadein taste se gehri hoti thi.",
  },
  {
    title: "🪑 Last Bench Legends",
    content:
      "Lecture kam, planning zyada. Wahin har trip, har masti ki shuruaat hoti thi.",
  },
  {
    title: "🎮 LAN Party Memories",
    content: "NFS aur CS ke tournament ne hostel ko warzone bana diya tha.",
  },
  {
    title: "🎤 Fresher’s Vibes",
    content: "Stage ka darr aur applause ka junoon — ek alag hi feeling thi!",
  },
  {
    title: "📸 Group Photo Saga",
    content:
      "Har group photo ka asli hero — woh banda jo sabko pose karwata tha!",
  },
];

const testimonials = [
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
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-black dark:text-white font-sans">
      <Navbar />

      <section
        className="w-full relative min-h-[500px] md:min-h-[900px] flex items-center justify-center text-center px-6 shadow-lg overflow-hidden"
        style={{
          backgroundImage: 'url("/mount.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl tracking-tight leading-tight drop-shadow-md">
            🎓 Apne College Ke Golden Din...
          </h1>
          <p className="mt-6 text-lg md:text-xl italic max-w-2xl mx-auto opacity-90">
            “Marks bhool jaate hain, lekin dosti aur masti... woh dil mein reh
            jaati hai.”
          </p>
          <Button className="mt-8 text-base sm:text-lg rounded-full px-6 py-3 bg-white text-black hover:bg-gray-200 transition duration-300 shadow">
            Start Your Memory Walk
          </Button>
        </div>
      </section>

      <section className="w-full bg-[#111] py-20 px-4">
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allCards.map((card, i) => (
            <div
              key={i}
              className="relative border border-white/15 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:scale-105 transition"
            >
              <img
                src={card.src}
                alt=""
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">
                {card.title}
              </h3>
              <p className="text-white/80 text-sm">{card.text}</p>
              <span className="absolute top-3 right-3 text-red-400">🕸</span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full py-24 bg-[#0d0d10] text-white overflow-hidden">
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
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4">
          <h2 className="text-4xl font-semibold">
            🕷 About <span className="text-red-500">ABES‑EC Memories</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">
            This zone is yours to fill — drop a short origin story, add a
            secondary hero image, or embed a comic‑style timeline of campus
            highlights.
          </p>
          <button
            onClick={() => navigate("/memories")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-bold shadow-lg transition"
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
          {memoryCards.map((card, i) => (
            <article
              key={i}
              className="relative min-h-[220px] flex flex-col justify-between p-6 rounded-2xl border border-red-400/20 bg-[#1a1a1d]/80 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
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
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="relative min-h-[180px] flex flex-col justify-between p-6 rounded-2xl border border-blue-400/20 bg-[#1c1e22]/80 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <h3 className="text-white font-bold text-lg mb-2">{t.name}</h3>
              <p className="text-white/80 text-sm leading-relaxed italic">
                “{t.text}”
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
          backgroundImage: 'url("abes2.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
        <div className="relative z-10 max-w-5xl mx-auto text-white space-y-10 px-6 py-10">
          <div className="flex justify-center">
            <Sparkles className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold drop-shadow-md">
            🕸️ Relive <span>Your</span> <span>ABES‑EC</span> Moments
          </h2>
          <p className="text-lg md:text-xl italic text-gray-300 max-w-3xl mx-auto leading-relaxed">
            “Woh <span>last‑bench</span> ki hasi, assignments ke dino ki
            <span className="font-semibold"> dosti</span>, aur
            <span className="font-semibold"> campus ke lamhe</span> — sab
            yaadein
            <span className="font-semibold"> likh daal yahaan!</span>” 🕸️
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="bg-red-500 hover:bg-blue-600 text-white text-lg px-10 py-3 rounded-full shadow-xl hover:scale-105 transition duration-300"
          >
            ✍️ Write Your Memory Now
          </button>
          <p className="text-lg text-gray-400">
            Every story deserves its web — leave yours here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
