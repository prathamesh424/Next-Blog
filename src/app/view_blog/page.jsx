"use client"

import React, { useState, useEffect, useRef } from 'react';
import { FiSettings } from 'react-icons/fi';
import './view.css';

const categories = [
  'Technology',
  'Health',
  'Travel',
  'Finance',
  'Education',
  'Lifestyle',
  'Food',
  'Art',
  'Sports',
];

const posts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    image: 'https://via.placeholder.com/300',
    date: 'September 24, 2024',
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'Tips for Healthy Living',
    image: 'https://via.placeholder.com/300',
    date: 'September 20, 2024',
    author: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Exploring the World of AI',
    image: 'https://via.placeholder.com/300',
    date: 'September 18, 2024',
    author: 'Alice Johnson',
  },
  {
    id: 4,
    title: 'The Best Travel Destinations for 2025',
    image: 'https://via.placeholder.com/300',
    date: 'September 15, 2024',
    author: 'Mark Lee',
  },
  {
    id: 5,
    title: 'Healthy Recipes for Busy People',
    image: 'https://via.placeholder.com/300',
    date: 'September 10, 2024',
    author: 'Emma Brown',
  },
];

const Explore = () => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  // Close the dropdown when clicking outside of it or when selecting an option
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsRef]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">
        {/* Sidebar (Categories for Desktop) */}
        <aside className="hidden md:flex flex-col justify-between w-1/4 p-4 bg-gray-800 relative">
          <div>
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-purple-500 after:absolute after:bg-purple-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Settings Icon at Bottom Left */}
          <div className="absolute bottom-4 left-4">
            <FiSettings
              className="text-2xl cursor-pointer hover:text-purple-500 transition duration-300"
              onClick={toggleSettings}
            />
            {showSettings && (
              <div
                ref={settingsRef}
                className="fixed bottom-16 left-4 w-48 bg-gray-700 rounded-md shadow-lg"
              >
                <ul className="p-2 space-y-2">
                  <li
                    className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                    onClick={() => setShowSettings(false)}
                  >
                    Profile
                  </li>
                  <li
                    className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                    onClick={() => setShowSettings(false)}
                  >
                    Account
                  </li>
                  <li
                    className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                    onClick={() => setShowSettings(false)}
                  >
                    Account Settings
                  </li>
                  <li
                    className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                    onClick={() => setShowSettings(false)}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 p-4">
          <h1 className="text-3xl font-bold mb-6">Explore</h1>

          {/* Categories (Top for Mobile) */}
          <div className="block md:hidden w-full p-4 mb-4 rounded-lg bg-black">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              {/* Settings Icon on Mobile (Opposite Hamburger) */}
              <FiSettings
                className="text-2xl cursor-pointer hover:text-purple-500 transition duration-300"
                onClick={toggleSettings}
              />
              {showSettings && (
                <div
                  ref={settingsRef}
                  className="absolute right-4 top-12 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10"
                >
                  <ul className="p-2 space-y-2">
                    <li
                      className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                      onClick={() => setShowSettings(false)}
                    >
                      Profile
                    </li>
                    <li
                      className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                      onClick={() => setShowSettings(false)}
                    >
                      Account
                    </li>
                    <li
                      className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                      onClick={() => setShowSettings(false)}
                    >
                      Account Settings
                    </li>
                    <li
                      className="hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                      onClick={() => setShowSettings(false)}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="overflow-x-auto whitespace-nowrap">
              <ul className="flex space-x-4">
                {categories.map((category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="block p-2 rounded hover:bg-gray-700 transition duration-300"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                <p className="text-gray-400">{post.date}</p>
                <p className="text-gray-500">By {post.author}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Explore;
