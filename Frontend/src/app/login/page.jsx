"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { User, Lock } from "lucide-react";
import AuthService from "../Services/AuthService";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await AuthService.login(form.username, form.password);

    Cookies.set("token", res.access_token, { expires: 2 });
    
    const name = form.username.split("@")[0]; // ✅ Extract first part of email
    Cookies.set("userName", name); // ✅ Save to cookie
    Cookies.set("authUpdatedAt", Date.now().toString()); // ✅ Trigger refresh
    window.dispatchEvent(new Event("authChanged")); // ✅ Notify Navbar

    router.push("/pages");
  } catch (err) {
    setError(err.response?.data?.error || "Login failed");
  }
};


  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold text-center text-green-700">
        Login to <span className="text-gray-900">Plant AI</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-4 py-3 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
