import { Router } from "express";

const route = Router();

route.get("/", async (req, res) => {
  res.status(200).send({ msg: "normas" });
});

route.post("/", async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.status(200).send({ message: "Success" });
});

export default route;
