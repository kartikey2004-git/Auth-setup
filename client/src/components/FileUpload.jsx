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
    setFiles(e.target.files);
  };

  // Upload files to backend
  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select at least one file.");
      return;
    }

    if (files.length > 5) {
      toast.warn("You can only upload up to 5 images.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length && i < 5; i++) {
      formData.append("avatar", files[i]); // 'avatar' must match multer field name
    }
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      const res = await axios.post(backendUrl + "/api/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Images uploaded successfully!");

        setImageUrls((prev) => [...res.data.data, ...prev]); // Add new uploads to existing list
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
        axios.defaults.withCredentials = true;

        const res = await axios.get(backendUrl + "/api/user/images");

        if (res.data.success) {
          setImageUrls(res.data.data);
        } else {
          toast.error("Failed to load images");
        }
      } catch (error) {
        toast.error("Server error while loading images", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="max-w-4xl mt-28 mx-auto p-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
        <form
          onSubmit={handleUpload}
          encType="multipart/form-data"
          className="flex flex-col gap-6"
        >
          {/* 🎓 Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2">
              📸 College Ki Yaadein
            </h2>
            <p className="text-gray-600 dark:text-gray-300 italic">
              “Apne woh golden moments yaahan upload karo — ek digital notice
              board pe!”
            </p>
          </div>

          {/* File Input */}
          <label className="block">
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              Upload Images (Max 5)
            </span>
            <input
              type="file"
              name="avatar"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 w-full block text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-100 file:text-indigo-700
        hover:file:bg-indigo-200"
            />
          </label>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-fit self-center bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
      <div>
        {/* Gallery / Carousel */}
        {imageUrls.length > 0 && (
          <div className="mt-16 relative overflow-hidden w-full h-full">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 drop-shadow-sm">
               Yaadon Ki Gallery
            </h3>

            <div className="relative overflow-hidden w-full h-full py-20">
              <Carousel slides={imageUrls.map((url) => ({ src: url }))} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;