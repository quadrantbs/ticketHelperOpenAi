"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("Berikut Tiketnya");
  const [response, setResponse] = useState("");
  const [image, setImage] = useState(null); // State untuk menyimpan gambar
  const [imagePreview, setImagePreview] = useState(null); // Preview gambar
  const [loading, setLoading] = useState(false);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Hasil Base64 akan ada di reader.result
      reader.onerror = reject;
      reader.readAsDataURL(file); // Membaca file dan mengonversinya menjadi Base64
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = {
        prompt,
        image: await convertImageToBase64(image),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data.result || "No response");
    } catch (error) {
      console.error(error);
      console.log(error);
      setResponse("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImagePaste = (e) => {
    const clipboardItems = e.clipboardData.items;
    for (const item of clipboardItems) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        break;
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      onPaste={handleImagePaste} // Listener untuk paste gambar
      onDragOver={handleDragOver} // Listener untuk drag over
      onDrop={handleDrop} // Listener untuk drop gambar
      className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4"
      data-theme="dark"
    >
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl z-50">
          Loading...
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        OpenAI Ticket Helper
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-lg bg-base-100 p-6 rounded-lg shadow-md"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload} // Upload gambar dari local
          className="file-input file-input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>

      <div className="flex flex-row gap-10">
        {imagePreview && (
          <div className="mt-8 w-full max-w-full bg-base-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Image Preview:
            </h2>
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-[1080px] rounded-lg border border-base-300"
            />
          </div>
        )}

        {response && (
          <div className="mt-8 w-full max-w-full bg-base-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Response:
            </h2>
            <pre className="p-4 bg-base-300 rounded-lg text-sm overflow-auto text-neutral-content">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
