/* eslint-disable react-hooks/exhaustive-deps */
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Carousel } from "./ui/carousel";

const FileUpload = () => {
  const { backendUrl } = useContext(AppContext);

  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Handle file selection
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Upload files to backend
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!files.length) {
      toast.error("Please select at least one file.");
      return;
    }

    if (files.length > 5) {
      toast.warn("You can only upload up to 5 images.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length && i < 5; i++) {
      formData.append("avatar", files[i]); // field name must match multer
    }

    try {
      setLoading(true);

      const res = await axios.post(`${backendUrl}/api/user/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Images uploaded successfully!");
        setImageUrls((prev) => [...(res.data.data || []), ...prev]);
        setFiles([]);
      } else {
        toast.error("Upload failed: " + res.data.message);
      }
    } catch (err) {
      console.error("Error uploading files:", err);
      toast.error("Upload error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all images on component mount

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/images`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setImageUrls(res.data.data || []);
        } else {
          toast.error("Failed to load images");
        }
      } catch (error) {
        toast.error("Server error while loading images: " + error?.message);
      }
    };

    fetchImages();
  }, [backendUrl]);

  return (
    <>
      <section className="min-h-screen flex flex-col md:flex-row bg-[#0d0d10] text-white  mt-16 relative overflow-hidden">
        <div className="w-full md:w-[420px] p-8 rounded-2xl bg-[#0f0f11]/90 border border-red-500/30 shadow-2xl backdrop-blur-sm">
          <header className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-red-500 mb-3 drop-shadow">
              📸 College Ki Yaadein
            </h2>
            <p className="text-gray-400 italic text-sm">
              “Apne golden moments yaahan upload karo — ek digital notice‑board
              pe!”
            </p>
          </header>

          <form
            onSubmit={handleUpload}
            encType="multipart/form-data"
            className="space-y-8"
          >
            {/* drag‑and‑drop zone */}
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-red-500/40 rounded-xl p-8 cursor-pointer hover:border-blue-500/60 transition"
            >
              <span className="text-gray-300 text-center text-sm">
                Drag or click to upload (max 5 images)
              </span>
              <input
                id="imageUpload"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mx-auto block w-40 py-3 rounded-full font-semibold bg-red-600 hover:bg-blue-600 transition-colors shadow-lg"
            >
              {loading ? "Uploading…" : "Upload"}
            </button>
          </form>
        </div>

        {/* 🕸  Bottom‑right Spidey (hidden on small screens) */}
        <img
          src="/spidy.png"
          alt="Spidey pose"
          className="hidden md:block absolute bottom-0 right-0 w-[280px] md:w-[340px] lg:w-[380px] object-contain drop-shadow-[0_10px_20px_rgba(255,0,0,0.5)] pointer-events-none select-none"
        />
      </section>

      {/* ——  Gallery  —— */}
      {imageUrls.length > 0 && (
        <section className="mt-24 px-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 drop-shadow-lg">
            Yaadon Ki Gallery
          </h3>

          <div className="relative max-w-6xl mx-auto">
            <Carousel slides={imageUrls.map((src) => ({ src }))} />
          </div>
        </section>
      )}
    </>
  );
};

export default FileUpload;
