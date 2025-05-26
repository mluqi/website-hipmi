"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/services/api";
import { useAuth } from '@/contexts/AuthContext'; 

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import axios from "axios";

const Login = () => {
  const { login: authLogin, isAuthenticated, isLoading: authLoading } = useAuth(); 
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      
      const data = response.data;

      authLogin(data.token); 

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || err.response.data.message || "Login gagal. Periksa kembali email dan password Anda.");
      } else {
        setError(err.message || "Terjadi kesalahan saat login.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <LoadingSpinner />
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-secondary p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          {/* Anda bisa menambahkan logo di sini jika ada */}
          <Image
            src="/assets/logo.png" 
            alt="HIPMI Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-300 mt-1">
            Masuk untuk mengelola konten website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Alamat Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-accent focus:border-accent transition-colors placeholder-slate-400"
              placeholder="anda@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password} // Gunakan state password yang baru ditambahkan
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-accent focus:border-accent transition-colors placeholder-slate-400"
              placeholder="Masukkan password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded-md text-center">
              {error}
            </p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-70"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
