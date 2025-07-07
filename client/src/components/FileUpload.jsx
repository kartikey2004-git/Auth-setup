import { AppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const FileUpload = () => {
  const { backendUrl } = useContext(AppContext);

  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

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
        setImageUrls(res.data.data); // array of secure_urls
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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <h2 className="text-xl font-bold mb-2">Upload Images (Max 5)</h2>
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
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {loading && (
        <div className="mt-4 text-gray-600">⏳ Uploading... Please wait</div>
      )}

      {/* Uploaded Image Preview */}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="max-w-xs w-full group/card">
            <div
              className={cn(
                "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                "bg-cover"
              )}
              style={{ backgroundImage: `url(${url})` }}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                <img
                  height="100"
                  width="100"
                  alt="Avatar"
                  src="/manu.png"
                  className="h-10 w-10 rounded-full border-2 object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-normal text-base text-gray-50 relative z-10">
                    Manu Arora
                  </p>
                  <p className="text-sm text-gray-400">2 min read</p>
                </div>
              </div>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  Author Card
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  Card with Author avatar, complete name and time to read - most
                  suitable for blogs.
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
