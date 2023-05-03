import { Router } from "express";
import { uploadAudio, uploadPoster } from "../aws/s3Upload";

const route = Router();

route.post(
  "/",
  uploadPoster.single("poster"),
  uploadAudio.single("music"),
  (req, res) => {
    console.log(req.body);
    console.log(req.files);
    if (req.file) {
      res.send(`File uploaded: ${req.file}`);
    } else {
      res.status(400).send("No file uploaded");
    }
  }
);

export default route;
