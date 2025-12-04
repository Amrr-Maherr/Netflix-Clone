"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/Store/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Account() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");

  const handleSave = () => {
    dispatch(setUser({ name, email, image }));
    toast.success("Changes saved!");
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
      {/* Header similar to Netflix */}
      <header className="bg-black border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="bg-black/80 p-8 rounded-md">
          {/* User Profile Section */}
          <div className="flex items-center gap-6 mb-12">
            {image && (
              <Image
                src={image}
                alt="User Avatar"
                width={120}
                height={120}
                className="rounded-lg object-cover border border-gray-600"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {name || "User"}
              </h2>
              <p className="text-gray-400">{email || "user@example.com"}</p>
              <Button
                onClick={handleSave}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-2"
              >
                Save Changes
              </Button>
            </div>
          </div>

          {/* Settings Section */}
          <div className="border-t border-gray-700 pt-8">
            <h3 className="text-xl font-bold text-white mb-6">
              Membership & Billing
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
                <span className="text-white">Email Address</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none"
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
                <span className="text-white">Name</span>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="border-t border-gray-700 pt-8 mt-8">
            <h3 className="text-xl font-bold text-white mb-6">
              Profile Settings
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">Avatar</span>
                <input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white px-3 py-2 rounded"
                  readOnly
                  placeholder="Provided by Google"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
