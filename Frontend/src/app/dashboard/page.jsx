"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ImageUp, ScanSearch, LoaderCircle, Clock, LogOut } from "lucide-react";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      console.log("TOKEN BEFORE PREDICT:", Cookies.get("token"));

      const res = await api.post("/predict", formData);
      setResult(res.data);
    } catch (err) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Buttons */}
      <div className="flex justify-between items-center">
        {/* <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 font-medium px-4 py-2 rounded-lg transition"
        >
          <LogOut size={16} />
          Logout
        </button> */}

        <button
          onClick={() => router.push("/history")}
          className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition"
        >
          <Clock size={16} />
          View History
        </button>
      </div>

      {/* Main Section */}
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Upload Panel */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-center text-indigo-700">
            Plant Disease Prediction
          </h1>

          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition"
          >
            <ImageUp className="text-indigo-500" />
            <span className="text-sm text-gray-600">
              {file ? file.name : "Choose an image..."}
            </span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-lg transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Predicting...
              </>
            ) : (
              <>
                <ScanSearch size={18} />
                Predict
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="w-full md:w-1/2 bg-white border rounded-xl shadow p-5">
          {result ? (
            <div className="space-y-4 break-words">
              <h2 className="text-xl font-bold text-green-700">
                Prediction Result
              </h2>
              <div>
                <p className="text-sm text-gray-500">Predicted Class:</p>
                <p className="text-lg font-semibold text-gray-900 break-words w-full max-w-full">
                  {result.predicted_class.replaceAll("_", " ")}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Confidence:</p>
                <p className="text-lg font-medium text-indigo-600">
                  {result.confidence}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Suggestion:</p>
                <p className="text-gray-700">{result.suggestion}</p>
              </div>

              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE}${result.image_url}`}
                alt="Predicted result"
                className="w-full max-w-xs rounded-lg border mt-4 object-cover"
              />
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400">
              Upload an image and run prediction to see results.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
