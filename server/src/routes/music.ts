import { S3 } from "aws-sdk";
import awsS3Client from "../aws/s3Upload";
import { Router } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import Music from "../database/schemas/music";
import User from "../database/schemas/user";

const route = Router();

const bucketName = process.env.AWS_BUCKET_NAME as string;

const upload = multer().fields([
  { name: "poster", maxCount: 1 },
  { name: "music", maxCount: 1 },
]);

route.get("/", async (req, res) => {
  try {
    let music = await Music.find({});

    //  Promise.all(
    //   music.map(async (sound) => {
    //     const poster = await User.findById(sound.userId);
    //     return {
    //       ...music,
    //       fullUserName: poster?.firstName + " " + poster?.lastName,
    //     };
    //   })
    // );

    res.status(200).send({ message: "success", data: music });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

route.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log();
    const userMusic = await Music.find({ userId });

    res.status(200).send({ message: "success", data: userMusic });
  } catch (error) {}
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

    const fileіId = uuid(); // make unique id for files

    // upload music file to S3
    const musicParams: S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `music/audio/${fileіId}-${musicFile.originalname}`,
      Body: musicFile.buffer,
      ACL: "public-read",
    };
    const musicResult = await awsS3Client.upload(musicParams).promise();

    // upload poster file to S3
    const posterParams: S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `music/poster/${fileіId}-${posterFile.originalname}`,
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

// add deleting sounds
route.delete("/", async (req, res) => {
  res.send(200);
});

export default route;
