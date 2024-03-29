import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import AuthRoute from "./routes/auth";
import MusicRoute from "./routes/music";

// connect to database
import "./database";

const app: Express = express();
const PORT = process.env.PORT;

//app dependencies
app.use(cors(), express.urlencoded(), express.json({limit: "200mb"}));

// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


app.get("/", (req, res) => {
  res.send("Welkome to musuc API server");
});

app.use((req, res, next) => {
  console.log(`\t--> ${req.method}:${req.url}, Body: ${Object.keys(req.body)}`);
  next();
});

app.use("/auth", AuthRoute);
app.use("/music", MusicRoute);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
