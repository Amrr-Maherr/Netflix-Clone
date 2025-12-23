"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { logoutUser } from "../../Api/Auth";
import { useRouter } from "next/navigation";

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Please log in first</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Account</h1>

        <div className="space-y-6">
          {/* Membership & Billing */}
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">MEMBERSHIP & BILLING</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <div>
                  <p className="text-gray-400">Email</p>
                  <p>{user.email}</p>
                </div>
                <button className="text-blue-400 hover:underline">Change email</button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">Membership & Billing</p>
                  <p>No active subscription</p>
                </div>
                <button className="text-blue-400 hover:underline">Change plan</button>
              </div>
            </div>
          </section>

          {/* Profile & Parental Controls */}
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">PROFILE & PARENTAL CONTROLS</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center text-2xl">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="font-semibold">{user.displayName || "User"}</p>
                    <p className="text-gray-400">All Maturity Ratings</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:underline">Manage</button>
              </div>
            </div>
          </section>

          {/* Settings */}
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">SETTINGS</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <div>
                  <p className="text-gray-400">Playback settings</p>
                  <p>Autoplay controls</p>
                </div>
                <button className="text-blue-400 hover:underline">Change</button>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <div>
                  <p className="text-gray-400">Test Participation</p>
                  <p>Help improve Netflix</p>
                </div>
                <button className="text-blue-400 hover:underline">Manage</button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">Recent device streaming activity</p>
                  <p>See recent activity for troubleshooting</p>
                </div>
                <button className="text-blue-400 hover:underline">View</button>
              </div>
            </div>
          </section>

          {/* Sign out of all devices */}
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">SIGN OUT OF ALL DEVICES</h2>
            <p className="text-gray-400 mb-4">This will sign you out of all devices signed into your account.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Sign out of all devices
            </button>
          </section>

          {/* Sign out */}
          <section className="bg-gray-900 p-6 rounded-lg">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Sign out
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
