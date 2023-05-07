import { S3 } from "aws-sdk";
import awsS3Client from "../aws/s3Upload";
import { Router } from "express";
import multer from "multer";

const route = Router();

// const accessIdKey = process.env.AWS_ACCESS_KEY_ID as string;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID as string;
// const bucketRegion = process.env.AWS_BUCKET_REGION as string;
const bucketName = process.env.AWS_BUCKET_NAME as string;

const upload = multer().fields([
  { name: "poster", maxCount: 1 },
  { name: "music", maxCount: 1 },
  { name: "title" },
]);

route.post("/", upload, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    if (!req.files) {
      return res.status(500).send({ message: "Files not found" });
    }
    let musicFile, posterFile;

    if (Array.isArray(req.files)) {
      // when using `upload.array()` method in multer
      [posterFile, musicFile] = req.files;
    } else {
      // when using `upload.fields()` method in multer
      musicFile = req.files.music?.[0];
      posterFile = req.files.poster?.[0];
    }
    // upload music file to S3
    const musicParams: S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `music/audio/${Date.now()}-${musicFile.filename}`,
      Body: musicFile.buffer,
      ACL: "public-read",
    };
    const musicResult = await awsS3Client.upload(musicParams).promise();

    // upload poster file to S3
    const posterParams: S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `music/poster/${Date.now()}-${posterFile.filename}`,
      Body: posterFile.buffer,
      ACL: "public-read",
    };
    const posterResult = await awsS3Client.upload(posterParams).promise();

    // send response to the client
    res.send({
      musicUrl: musicResult.Location,
      posterUrl: posterResult.Location,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
});

export default route;
