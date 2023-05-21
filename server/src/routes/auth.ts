import { Router } from "express";
import User from "../database/schemas/user";

const route = Router();

// testign route
route.get("/", (req, res) => {
  try {
    res.status(200).send({ text: "Route test good" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

//login
route.post("/", async (req, res) => {
  try {
    const { uid } = req.body;
    const { type } = req.body;

    const user = await User.findOne({ uid: uid });

    //console.log(user);
    res.status(200).send({ message: `${type} successful`, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

route.post("/google", async (req, res) => {
  try {
    const { firstName, avatarUrl, lastName, email, uid } = req.body;
    console.log(req.body);

    const checkUser = await User.findOne({ uid: uid });

    if (checkUser) {
      return res
        .status(202)
        .send({ message: "Auth successful", user: checkUser });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      uid: uid,
      avatarPath: avatarUrl,
    });

    res.status(204).send({ massage: "Registration successful", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

//registration
route.post("/registration", async (req, res) => {
  try {
    const { firstName, lastName, email, uid } = req.body;
    console.log(req.body);

    const checkUser = await User.find({ uid: uid });

    if (checkUser) {
      return res.status(400).send({ message: "User alredy registred" });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      uid: uid,
    });

    res
      .status(204)
      .send({ massage: "Registration successful", id: newUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

export default route;
