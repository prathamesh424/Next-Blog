import multer from 'multer';
import { NextResponse } from 'next/server';
import uploadOnCloudinary from '@/utils/cloudnary';
import connectDB from '@/lib/database/db';
import Blog from '@/lib/models/blog';
import fs from 'fs';
import path from 'path';

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: '../../../../../public/temp',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const config = {
  api: {
    bodyParser: false, // Disable body parser for file uploads
  },
};

// Helper function to handle middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
};

// Connect to the database
await connectDB();

export async function POST(req, res) {
  try {
    // Handle file upload
    await runMiddleware(req, res, upload.single('picture'));

    // Log the request body and file
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { title, description } = req.body;

    // Ensure both title and description are provided
    if (!title || !description) {
      console.log('Missing title or description.');
      return NextResponse.json({ error: 'Please provide both title and description.' }, { status: 400 });
    }

    const thumbnailFile = req.file;

    let thumbnailPath = null;
    if (thumbnailFile) {
      const tempFilePath = path.join(process.cwd(), thumbnailFile.path);
      console.log('Uploading image to Cloudinary...');
      thumbnailPath = await uploadOnCloudinary(tempFilePath);
      fs.unlinkSync(tempFilePath);  // Remove the file after uploading
    }

    // Log the thumbnail path
    console.log('Thumbnail Path:', thumbnailPath);

    // Check for existing blog with the same title
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      console.log('Blog with the same title already exists.');
      return NextResponse.json({ error: 'Blog with the same title already exists.' }, { status: 409 });
    }

    // Save new blog
    const newBlog = new Blog({ title, description, picture: thumbnailPath });
    const savedBlog = await newBlog.save();
    console.log('Blog saved successfully:', savedBlog);

    return NextResponse.json({ message: 'Blog created successfully.', success: true, savedBlog });
  } catch (error) {
    console.error('Error occurred:', error.message);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}
