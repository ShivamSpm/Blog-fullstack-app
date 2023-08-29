import multer from 'multer';
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const addImg = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const updatedFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + file.originalname;

  // Upload the file to S3
  const uploadParams = {
    Bucket: 'uploads-blog-website', // Replace with your bucket name
    Key: updatedFileName,
    Body: file.buffer
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const result = await s3.send(command);
    console.log('File uploaded to S3:', result.Location);
    res.status(200).json(updatedFileName);
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).send('Error uploading to S3');
  }
};

export const uploadImage = [upload.single('file'), addImg];