"use client"


import React from 'react';

const userBlogs = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    image: 'https://via.placeholder.com/300',
    date: 'September 24, 2024',
    content: 'This blog post explores React Hooks and their importance...',
  },
  {
    id: 2,
    title: 'Tips for Healthy Living',
    image: 'https://via.placeholder.com/300',
    date: 'September 20, 2024',
    content: 'In this blog post, we share tips for maintaining a healthy lifestyle...',
  },
  {
    id: 3,
    title: 'Exploring the World of AI',
    image: 'https://via.placeholder.com/300',
    date: 'September 18, 2024',
    content: 'An introductory guide to artificial intelligence...',
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Profile Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-32 h-32 object-cover rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-gray-400">Web Developer, Blogger</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>

        {/* User Bio */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-gray-400">
            Hello! I am a passionate web developer specializing in React and
            Next.js. I love building responsive and dynamic web applications.
          </p>
        </div>

        {/* User Blogs */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.map((blog) => (
              <div key={blog.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
                <p className="text-gray-400">{blog.date}</p>
                <p className="text-gray-500">{blog.content.slice(0, 100)}...</p>
                <button className="mt-2 text-purple-500 hover:underline">Read More</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
