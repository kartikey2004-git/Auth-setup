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
          backendUrl + "/api/user/createBlog",
          formData
        );

        const newMemory = res.data?.data;
        if (newMemory) {
          setCards((prev) => [newMemory, ...prev]);
        }

        setFormData({ title: "", description: "", funnyIncident: "" });
      } catch (error) {
        console.error("Error creating memory:", error);
      }
    }
  };

  // 📦 Fetch all memories from DB on component load

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/user/getBlogs");
        console.log("Fetched cards:", res.data); // debug
        setCards(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching memories:", err);
        setCards([]); // fallback
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
  {/* 🟨 Left 1/3: Form */}
  <div className="w-full md:w-1/3 p-6 shadow-lg mt-12 md:mt-28">
    <h2 className="text-2xl font-bold mb-6 text-center">📝 Create Memory</h2>

    <div className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter title"
        className="w-full border border-gray-300 p-3 rounded-lg"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter description"
        rows="3"
        className="w-full border border-gray-300 p-3 rounded-lg"
      />

      <textarea
        name="funnyIncident"
        value={formData.funnyIncident}
        onChange={handleChange}
        placeholder="Share a funny incident"
        rows="3"
        className="w-full border border-gray-300 p-3 rounded-lg"
      />

      <button
        onClick={handleCreate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Create
      </button>
    </div>
  </div>

  {/* 🟦 Vertical Divider (hidden on mobile) */}
  <div className="hidden md:block w-[2px] bg-[#121212] mx-1" />

  {/* 🟩 Right 2/3: Cards */}
  <div className="w-full md:flex-1 pt-6 px-6 overflow-y-auto">
    <h3 className="text-2xl font-semibold text-center mb-32"></h3>
    <h3 className="text-2xl font-semibold text-center mb-8">📚 Memories</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.isArray(cards) &&
        cards.map((card, index) => (
          <Card
            key={card._id}
            className="bg-neutral-900 border border-neutral-800 text-white shadow-xl rounded-xl hover:shadow-2xl transition-all duration-200"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="text-orange-500 px-2 py-1 rounded-md text-xs font-semibold tracking-wide">
                  🎓 Memory #{index + 1}
                </span>
                <span className="text-xs">
                  {new Date(card.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>
              <CardTitle className="mt-2 text-xl font-bold text-white">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="text-gray-300 leading-relaxed">
                {card.description}
              </CardDescription>
              <p className="text-orange-400 italic text-sm">
                {card.funnyIncident}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["#College", "#Masti", "#Yaadein"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full font-medium transition-all duration-200"
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
</div>

  );
};

export default MemoryForm;
