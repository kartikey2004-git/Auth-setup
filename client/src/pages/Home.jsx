import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const allCards = [
  {
    src: "/blog.jpeg",
    title: "Yo Cuties 👋",
    text: "Spidey here... dropping webs and random thoughts!",
  },
  {
    src: "/thor.jpg",
    title: "Sup Asgardians ⚡",
    text: "Thunder just hit different when Thor walks in, right?",
  },
  {
    src: "/ironman.jpg",
    title: "Ironman Mode 😎",
    text: "Suit up. Show up. Outsmart everyone — that's Stark 101.",
  },
  {
    src: "/captain.jpg",
    title: "Captain Classic",
    text: "The guy with the shield, the heart, and the ‘never back down’ vibe.",
  },
];

const memoryCards = [
  {
    title: "🗽 Battle of New York",
    content:
      `"Bhai jab aliens aaye the, Tony ne missile leke upar chadh diya. Hum niche sirf popcorn leke dekh rahe the." – Clint`,
  },
  {
    title: "🍗 Shawarma Aftermath",
    content:
      `"Pura din ladayi ke baad sab chup chaap baith ke shawarma kha rahe the. Loki bhi almost join kar leta!" – Steve`,
  },
  {
    title: "🛸 Ultron Ka Hungama",
    content:
      `"Ultron ko AI banaya tha... par banda full toxic nikla. Stark, ye tera idea tha na?" – Bruce`,
  },
  {
    title: "🪙 Civil War Drama",
    content:
      `"Matlab ek pen ke sign ke liye pura team toot gaya. Cap aur Tony ke beech toh full Bigg Boss chalu ho gaya tha." – Sam`,
  },
  {
    title: "💥 Hulk Ka Rampage",
    content:
      `"‘Puny god’ bolke Hulk ne Loki ko patak diya tha... aur hum sab ‘rewind’ maar ke dekh rahe the baar baar." – Thor`,
  },
  {
    title: "🧤 Infinity Gauntlet Heist",
    content:
      `"Gauntlet ka relay race chalu tha. Banda banda snap rokne mein laga tha. Aur Stark ne last mein sabki entry cancel kar di." – Peter`,
  },
];

const testimonials = [
  {
    name: "Tony Stark",
    text: `"I told them I had a plan. Truth is, I made it up as we went. Still won."`,
  },
  {
    name: "Steve Rogers",
    text: `"Language? Bro, do you *know* what Thor says when he's drunk?"`,
  },
  {
    name: "Natasha Romanoff",
    text: `"Half of these idiots would be dead if I didn’t babysit them during missions."`,
  },
  {
    name: "Thor Odinson",
    text: `"I once brought beer to a mission briefing. Midgardians were not amused."`,
  },
  {
    name: "Bruce Banner",
    text: `"‘Don’t make me angry’ was never just a line. Ask Sokovia."`,
  },
  {
    name: "Peter Parker",
    text: `"They said ‘stay on the jet’. I didn’t. Now there’s a meme."`,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-black dark:text-white font-sans">
      <Navbar />

      <section
        className="w-full relative min-h-[700px] md:min-h-[900px] flex items-center justify-center text-center px-6 shadow-lg overflow-hidden"
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
