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
    <div className="h-auto  text-white flex items-center justify-center">
      <div className="mx-auto pt-20 sm:py-15">
        {/* <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Account Profile</h1> */}

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8 rounded-lg shadow-2xl border border-gray-700">
          {/* User Profile Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{user.displayName || "User"}</h2>
            <p className="text-gray-300 text-sm sm:text-base bg-gray-800 px-3 py-1 rounded-full inline-block">{user.email}</p>
          </div>

          {/* Firebase User Data */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center">
              <span className="w-1 h-6 bg-red-600 rounded mr-3"></span>
              Account Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <span className="text-gray-400 block text-sm font-medium mb-1">User ID</span>
                <span className="text-white text-sm sm:text-base break-all font-mono bg-gray-900 px-2 py-1 rounded">{user?.uid}</span>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <span className="text-gray-400 block text-sm font-medium mb-1">Provider</span>
                <span className="text-white text-sm sm:text-base capitalize bg-blue-900/20 text-blue-300 px-2 py-1 rounded">{user?.providerData?.[0]?.providerId || "email"}</span>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <span className="text-gray-400 block text-sm font-medium mb-1">Account Created</span>
                <span className="text-white text-sm sm:text-base">
                  {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <span className="text-gray-400 block text-sm font-medium mb-1">Last Sign In</span>
                <span className="text-white text-sm sm:text-base">
                  {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <span className="text-gray-400 block text-sm font-medium mb-1">Email Verified</span>
                <span className={`text-sm sm:text-base px-2 py-1 rounded ${user?.emailVerified ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'}`}>
                  {user?.emailVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t border-gray-600">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
