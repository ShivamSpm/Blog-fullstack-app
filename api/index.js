import express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import uploadRoutes from "./routes/uploads.js"

import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser())



//https://blog-fullstack-app-kappa.vercel.app
//http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client's origin
    credentials: true
  }));

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/upload", uploadRoutes);
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../client/public/upload')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, Date.now()+file.originalname)
//   }
// })

// const upload = multer({storage})
// app.post('/api/upload', upload.single('file'), function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// })


// app.post('/api/upload', function (req, res) {
//   const file = req.file; // Assuming you still have access to the uploaded file
//   console.log("req");
//   console.log(req);
//   console.log(file);
//   // const params = {
//   //   Bucket: 'your-s3-bucket-name',
//   //   Key: 'uploads/' + file.filename, // Set the S3 object key
//   //   Body: file.buffer // Assuming you have access to the file buffer
//   // };

//   // // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
//   // // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
//   // s3.upload(params, function(err, data) {
//   //   if (err) {
//   //     console.error(err);
//   //     return res.status(500).send('Error uploading to S3');
//   //   }

//   //   res.status(200).json({ location: data.Location });
//   // });
// });

app.listen(4000, ()=>{
    console.log("Connected");
})