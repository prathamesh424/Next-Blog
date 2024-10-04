"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { AiFillCloseCircle } from "react-icons/ai";

const BlogPostForm = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    picture: null
  });
  
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
      setThumbnailFile(file);
    }
  };

  const handleRemoveImage = () => {
    setBannerImage(null);
    setThumbnailFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!blog.title || !blog.description) {
      alert('Please fill out all fields');
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('description', blog.description);
    if (thumbnailFile) {
      formData.append('picture', thumbnailFile);
    }

    console.log(formData)
  
    try {
      const response = await axios.post('/api/posts/create_blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure that the request is properly recognized as multipart/form-data
        },
      });
  
      if (response.data.success) {
        console.log('Post created successfully:', response.data);
        router.push("/view_blog");
      } else {
        console.error('Error:', response.data.error);
      }
  
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-10">
        <div className="relative">
          <label className="w-full cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-xl p-12 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-center group">
            {bannerImage ? (
              <div className="relative w-full">
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="w-full h-72 object-cover rounded-xl shadow-lg transition-all duration-500"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-black bg-opacity-75 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300"
                >
                  <AiFillCloseCircle className="w-8 h-8" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <span className="text-lg font-bold text-gray-400 group-hover:text-white transition-all duration-300">
                  Upload a Banner Image
                </span>
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-all duration-300">
                  Click to select an image
                </span>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

 
        <div className="relative">
          <input
            type="text"
            placeholder="Enter an Engaging Blog Title"
            value={blog.title}
            onChange={(e) => setBlog({...blog, title: e.target.value})}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-xl font-semibold text-white focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-800 transition-all duration-300 shadow-lg"
          />
        </div>

 
        <div className="relative">
          <textarea
            placeholder="Write your blog content here..."
            value={blog.description}
            onChange={(e) => setBlog({...blog, description: e.target.value})}
            className="w-full h-72 bg-gray-800 border border-gray-600 rounded-lg p-4 text-lg text-white leading-relaxed focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-800 transition-all duration-300 shadow-lg resize-none"
          />
        </div>

 
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 transition-all text-white font-semibold py-3 px-12 rounded-full shadow-2xl hover:shadow-purple-600/50 duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;


