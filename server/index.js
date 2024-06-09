import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
import dbConnect from './config/database.js';
import bodyParser from 'body-parser';
import router from './routes/route.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

// middlewares ka kaam yha pr

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use('/v1', router);
// Set up storage for uploaded files

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer middleware

const upload = multer({ storage: storage });

// Handle file upload route

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: ' No file uploaded',
    });
  }
  const fileUrl = req.file.path;
  return res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    NewPath: fileUrl,
  });
});
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }
//   console.log(req.file);

//   const fileUrl = req.file.path; // Path to the uploaded file on the server
//   res.json({ fileUrl });
// });

// database connection
dbConnect();

// listening ka sara kaam yha pr
app.listen(port, (req, res) => {
  console.log(`app is listening on ${port}`);
});

app.get('/', (req, res) => {
  res.send('It is the home root');
});
