"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/logout-button";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading agar tidak flicker

  useEffect(() => {
    // Cek status login Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        // Tidak login → tendang ke halaman login
        router.replace("/login");
        return;
      }

      // Kalau login, ambil data dari localStorage (UI)
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Loading saat cek auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Safety: kalau user null (jarang terjadi)
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Tidak ada data user.</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      <div className="flex items-center gap-5 p-5 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <img
          src={user.photo}
          alt="User Photo"
          className="w-20 h-20 rounded-full border"
        />

        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
