"use client"
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';  

const BlogPostForm = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setBannerImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, content });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-10">

        {/* Image Upload Section */}
        <div className="relative">
          <label className="w-full cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-xl p-12 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-center group">
            {bannerImage ? (
              <div className="relative w-full">
                {/* Uploaded Image */}
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="w-full h-72 object-cover rounded-xl shadow-lg transition-all duration-500"
                />

                {/* Remove Image Button */}
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-black bg-opacity-75 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300"
                >
                  <AiFillCloseCircle className="w-8 h-8" /> {/* Use the close icon from React Icons */}
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

        {/* Title Input Section */}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter an Engaging Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-xl font-semibold text-white focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-800 transition-all duration-300 shadow-lg"
          />
        </div>

        {/* Content (Blog) Textarea */}
        <div className="relative">
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-72 bg-gray-800 border border-gray-600 rounded-lg p-4 text-lg text-white leading-relaxed focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-800 transition-all duration-300 shadow-lg resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 transition-all text-white font-semibold py-3 px-12 rounded-full shadow-2xl hover:shadow-purple-600/50 duration-300 ease-in-out transform hover:scale-105"
          >
            Submit Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;
