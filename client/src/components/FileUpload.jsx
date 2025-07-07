/* eslint-disable react-hooks/exhaustive-deps */
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

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
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <h2 className="text-2xl font-bold mb-4">Upload Images (Max 5)</h2>
        <input
          type="file"
          name="avatar"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Display Images as Cards */}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imageUrls.map((url, index) => (
          <div key={index} className="max-w-xs w-full group/card">
            <div
              className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl bg-cover bg-center flex flex-col justify-between p-4"
              style={{ backgroundImage: `url(${url})` }}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                <div className="flex flex-col">
                  <p className="font-normal text-base text-gray-50 relative z-10">
                    Billi
                  </p>
                  <p className="text-sm text-gray-400">hu</p>
                </div>
              </div>
              <div className="text content z-10">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50">
                  Main Billa hu
                </h1>
                <p className="font-normal text-sm text-gray-50 my-4">
                  meow 🐾
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;