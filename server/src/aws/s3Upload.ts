import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const accessIdKey = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID as string;
const bucketRegion = process.env.AWS_BUCKET_REGION as string;
const bucketName = process.env.AWS_BUCKET_NAME as string; 

const s3Config = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessIdKey,
    secretAccessKey: secretAccessKey,
  },
});

// const uploadMusicToS3 = multer({
//   storage: multerS3({
//     s3: s3Config,
//     bucket: bucketName,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null,"/music/audio/"+Date.now().toString() + file.originalname);
//     },
//   }),
// });


// const uploadPosterToS3 = multer({
//   storage: multerS3({
//     s3: s3Config,
//     bucket: bucketName,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null,  "/music/poster/"+Date.now().toString()+file.originalname);
//     },
//   }),
// });


// const uploadAvatar = multer({
//   storage: multerS3({
//     s3: s3Config,
//     bucket: bucketName,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null,"/usersAvatars"+Date.now().toString() + file.originalname);
//     },
//   }),
// });

//export { uploadMusicToS3, uploadPosterToS3, uploadAvatar };
