import multer from 'multer';
import { NextResponse } from 'next/server';
import uploadOnCloudinary from '../../../../utils/cloudnary.js';
import fs from 'fs';
import path from 'path';

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/temp',
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
  limits: { fileSize: 5 * 1024 * 1024 }, 
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

export async function POST(req) {
  try {
    // Run the middleware to handle file upload
    await runMiddleware(req, {}, upload.single('picture'));

    const uploadedFile = req.file;

    // Log the uploaded file for debugging
    console.log('Uploaded File:', uploadedFile);

    if (!uploadedFile) {
      return NextResponse.json({ error: 'No image file uploaded or invalid file type.' }, { status: 400 });
    }

    // Construct the temp file path
    const tempFilePath = path.join('./public/temp', uploadedFile.filename);

    // Upload image to Cloudinary
    let imageUrl;
    try {
      imageUrl = await uploadOnCloudinary(tempFilePath);
    } catch (error) {
      await fs.promises.unlink(tempFilePath); // Clean up temp file in case of error
      return NextResponse.json({ error: 'Failed to upload image to Cloudinary.' }, { status: 500 });
    }

    // Remove the local temp file after upload
    await fs.promises.unlink(tempFilePath);

    // Respond with the image URL
    return NextResponse.json({ imageUrl, message: 'Image uploaded successfully.' });

  } catch (error) {
    console.error('Error uploading image:', error.message);
    return NextResponse.json({ error: 'Error occurred during image upload.' }, { status: 500 });
  }
}
