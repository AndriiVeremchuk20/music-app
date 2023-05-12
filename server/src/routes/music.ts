import { S3 } from "aws-sdk";
import awsS3Client from "../aws/s3Upload";
import { Router } from "express";
import multer from "multer";
import Music from "../database/schemas/music";

const route = Router();

const bucketName = process.env.AWS_BUCKET_NAME as string;

const upload = multer().fields([
  { name: "poster", maxCount: 1 },
  { name: "music", maxCount: 1 },
]);

route.get("/", async (req, res) => {
  try {
    const music = await Music.find({});
    res.status(200).send({ message: "success", data: music });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

route.post("/", upload, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const { title, genre, userId } = req.body;

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
      Key: `music/audio/${Date.now()}-${musicFile.originalname}`,
      Body: musicFile.buffer,
      ACL: "public-read",
    };
    const musicResult = await awsS3Client.upload(musicParams).promise();

    // upload poster file to S3
    const posterParams: S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `music/poster/${Date.now()}-${posterFile.originalname}`,
      Body: posterFile.buffer,
      ACL: "public-read",
    };
    const posterResult = await awsS3Client.upload(posterParams).promise();

    const newMusic = await Music.create({
      title: title,
      genre: genre,
      posterPath: posterResult.Location,
      musicPath: musicResult.Location,
      userId: userId,
    });

    // send response to the client
    res.status(202).send({ message: "Added success", newMusic: newMusic });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Server error" });
  }
});

export default route;
