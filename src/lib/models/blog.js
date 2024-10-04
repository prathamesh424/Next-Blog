import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,  
  },
  description: {
    type: String,
    required: true, 
  },
  picture: {
    type: String, 
    required: false,
  },
  categories: {
    type: [String],  
    default: [],    
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
});

const Blog = mongoose.models.blogs ||  mongoose.model('Blog', BlogSchema);

export default Blog;
