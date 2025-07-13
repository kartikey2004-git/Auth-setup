import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AppContext } from "@/context/AppContext";
import { toast } from "sonner";

const MemoryForm = () => {
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    funnyIncident: "",
  });

  const [cards, setCards] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (formData.title && formData.description && formData.funnyIncident) {
      try {
        const res = await axios.post(
          `${backendUrl}/api/user/createBlog`,
          formData,
          { withCredentials: true }
        );

        const newMemory = res.data?.data;
        if (newMemory) {
          setCards((prev) => [newMemory, ...prev]);
          toast.success("Memory created successfully!");
        }

        setFormData({ title: "", description: "", funnyIncident: "" });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error creating memory");
      }
    } else {
      toast.error("All fields are required!");
    }
  };

  // Fetch all memories from DB on component load

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/getBlogs`, {
          withCredentials: true,
        });

        setCards(res.data?.data || []);
      } catch (err) {
        toast.error("Error fetching memories", err);
        setCards([]); // fallback
      }
    };

    fetchCards();
  }, [backendUrl]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0d0d10] text-white  mt-16 relative overflow-hidden">
      {/* 🕸  faint web backdrop */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
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
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#web)" />
      </svg>

      {/* 📝  Left column: Create Memory form */}
      <div className="w-full md:w-[420px] p-8 rounded-2xl bg-[#0f0f11]/90 border border-red-500/30 shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold flex items-center justify-center gap-2 mb-4">
          <span className="text-red-500">🕷️</span> Create Memory
        </h2>

        <div className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full bg-[#1a1a1d] border border-red-600/30 focus:border-red-500 p-3 rounded-lg placeholder-gray-400 focus:outline-none"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Description"
            className="w-full bg-[#1a1a1d] border border-red-600/30 focus:border-red-500 p-3 rounded-lg placeholder-gray-400 focus:outline-none"
          />

          <textarea
            name="funnyIncident"
            value={formData.funnyIncident}
            onChange={handleChange}
            rows="3"
            placeholder="Funny incident"
            className="w-full bg-[#1a1a1d] border border-red-600/30 focus:border-red-500 p-3 rounded-lg placeholder-gray-400 focus:outline-none"
          />

          <button
            onClick={handleCreate}
            className="w-full bg-red-600 hover:bg-blue-600 transition-colors font-semibold py-3 rounded-lg shadow-md"
          >
            Save Memory
          </button>
        </div>
      </div>

      {/* 📸  Right column: Memory cards */}
      <div className="relative z-10 flex-1 p-6 md:p-10 overflow-y-auto">
        <h3 className="text-3xl font-bold text-center mb-10">🕸  Memories</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(cards) &&
            cards.map((card, index) => (
              <Card
                key={card._id}
                className="bg-[#151517] border border-red-600/20 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-red-600/20 transition-transform duration-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded font-semibold">
                      🎓 #{index + 1}
                    </span>
                    <span>
                      {new Date(card.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl font-bold">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-gray-300">
                    {card.description}
                  </CardDescription>
                  <p className="text-red-400 italic text-sm">
                    {card.funnyIncident}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["#College", "#Masti", "#Yaadein"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-red-600/10 text-red-400 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* 🕸  Decorative Spidey on far right (hidden on small screens) */}
      <img
        src="/spidy.png"
        alt="Spidey crouch"
        className="hidden lg:block absolute right-0 bottom-0 w-[400px] object-contain select-none pointer-events-none drop-shadow-[0_10px_20px_rgba(255,0,0,0.5)]"
      />
    </div>
  );
};

export default MemoryForm;
