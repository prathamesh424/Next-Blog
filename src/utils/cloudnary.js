import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';

 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (error, result) => {
            if (error) {
                reject(error);
            }
            fs.unlinkSync(filePath);
            resolve(result.secure_url); 
        });
    });
};


export {uploadOnCloudinary};