"use client"

import React, { useState, useEffect, useRef } from 'react';
import { FiSettings } from 'react-icons/fi';
import './view.css';
import axios from 'axios';

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

const Explore = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [posts, setPosts] = useState([]); // State to store the posts
  const settingsRef = useRef(null);

  // Function to fetch posts from the API
  const getPosts = async () => { 
    try {
      const response = await axios.get('/api/posts/all_posts');
      setPosts(response.data); // Set the fetched posts to the state
      posts.reverse();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

 
  useEffect(() => {
    getPosts();
  }, []);

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

          <div className="absolute bottom-4 left-4">
            <FiSettings
              className="text-2xl cursor-pointer hover:text-orange-500 transition duration-300"
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

        <main className="w-full md:w-3/4 p-4">
          <h1 className="text-3xl font-bold mb-6">Explore</h1>
          <div className="block md:hidden w-full p-4 mb-4 rounded-lg bg-black">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <FiSettings
                className="text-2xl cursor-pointer hover:text-orange-500 transition duration-300"
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
                key={post._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src="https://imgs.search.brave.com/LENf4yOxIDrIhiVRJOylPFeT-2EoN5VbHhCAn1OALX0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9ocmx0eDEy/cGw4aHEvN2phRkdR/dWFOaXJDQmdpbXVF/d0JWVC9jNDAzYWZj/ZDczZGI0MjI5ZGMx/YTc3MWEzMGUxZjI3/OC9Xb25kZXJzLW9m/LU5hdHVyZS1UaHVt/Yi5qcGc"
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                <p className="text-gray-400">{post.createdAt}</p>
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
