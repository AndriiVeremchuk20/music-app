import { S3 } from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const accessIdKey = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID as string;
const bucketRegion = process.env.AWS_BUCKET_REGION as string;
const bucketName = process.env.AWS_BUCKET_NAME as string;

const awsS3Client = new S3({
  accessKeyId: accessIdKey,
  secretAccessKey: secretAccessKey,
});

export default awsS3Client;
