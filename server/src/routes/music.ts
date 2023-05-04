import { Router } from "express";
import { uploadAudio, uploadPoster } from "../aws/s3Upload";
import multer from "multer";

const route = Router();

const upload = multer().fields([
  //{ name: "poster", maxCount: 1 },
 // { name: "title" },
]);

route.post(
  "/",
  //upload,
  uploadPoster.single("poster"),
  uploadAudio.single("music"),
  (req, res) => {
    console.log(req.body);
    console.log(req.files);
    // if (req.file) {
    //   res.send(`File uploaded: ${req.file}`);
    // } else {
    //   res.status(400).send("No file uploaded");
    // }
    res.send({ mst: "test" });
  }
);

export default route;
