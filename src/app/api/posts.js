import nc from 'next-connect';
import multer from 'multer';
import { uploadOnCloudinary } from '@/utils/cloudnary';
import Post from '@/lib/models/post';
import connectDB from '@/lib/database/db';

const upload = multer({ dest: './public/temp' }).fields([{ name: 'thumbnail', maxCount: 1 }]);

const handler = nc({
    onError: (err, req, res, next) => {
        res.status(500).json({ error: `Something went wrong! ${err.message}` });
    },
    onNoMatch: (req, res) => {
        res.status(404).json({ error: 'Not Found' });
    },
});

handler.use(upload);

handler.post(async (req, res) => {
    try {
        const connection = await connectDB();
        if (!connection) {
            return res.status(500).json({ message: 'Database connection failed' });
        }

        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0].path : null;
        const thumbnailPath = thumbnailFile ? await uploadOnCloudinary(thumbnailFile) : null;

        const post = await Post.create({ title, description, picture: thumbnailPath });

        res.status(200).json({ data: post, message: 'Post successfully created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const config = {
    api: {
        bodyParser: false,  
    },
};

export default handler;
