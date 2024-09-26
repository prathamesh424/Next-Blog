import multer from 'multer';

const upload = multer({ 
    dest: './public/temp' 
}).fields([
    { name: 'thumbnail', maxCount: 1 }, 
]);

export default upload;
