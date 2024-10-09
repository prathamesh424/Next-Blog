"use client";

import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Profile = () => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [userBlogs , setUserBlogs] = useState([]);


  const getBlogs = async () => {
    try {
      const response =  await axios.get('/api/posts/create_blog') ;
      setUserBlogs(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/users/data');
        setUser(res.data);   
        getBlogs();  
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);   
      }
    };
    fetchUserData();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold">{user ? `${user.user.username}`: "User001"}</h1>
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
              <div key={blog._id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <img src={blog.picture} alt={blog.title} className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
                <p className="text-gray-400">{blog.createdAt}</p>
                <p className="text-gray-500">{blog.description.slice(0, 100)}...</p>
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
