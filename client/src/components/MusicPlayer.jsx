/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // 50% default
  const [hovered, setHovered] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked. User interaction needed.", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;

    const playOnClick = () => {
      audio?.play().catch(() => {});
    };

    document.addEventListener("click", playOnClick, { once: true });

    return () => {
      document.removeEventListener("click", playOnClick);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/music/woh-din.mp3" loop preload="auto" />

      {/* Music Player Floating Box */}
      <div
        className="fixed bottom-6 right-8 z-50 flex flex-col items-center gap-2 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Vinyl Background */}

        <div
          className="relative w-12 h-12 rounded-full bg-white shadow-2xl transition-all duration-300 transform hover:scale-110"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            {isPlaying ? (
              <Volume2 className="w-7 h-7 " />
            ) : (
              <VolumeX className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Volume Tooltip & Slider */}

        <div
          className={`bg-black/70 text-white rounded-xl px-3 py-2 text-sm shadow-lg transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          🔉 {Math.round(volume * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 mt-2 accent-indigo-500"
          />
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
