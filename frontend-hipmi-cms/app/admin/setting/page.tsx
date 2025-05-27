"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Setting = () => {
  const { updatePassword, isLoading } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageError(null);
    setSuccessMessage(null);

    if (!oldPassword || !newPassword) {
      alert("Semua field harus diisi.");
      return;
    }
    if (newPassword.length < 8) {
      setPageError("Password baru minimal 8 karakter.");
      return;
    }
    if (oldPassword === newPassword) {
      setPageError("Password baru tidak boleh sama dengan password lama.");
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);
      setSuccessMessage("Password berhasil diubah!");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPageError(err.message || "Terjadi kesalahan saat mengubah password.");
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-6 text-textcolor">Ganti Password</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        {pageError && <p className="text-red-500 mb-4">{pageError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password Lama
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-textcolor"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password Baru
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-textcolor"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {isLoading ? "Menyimpan..." : "Ganti Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
