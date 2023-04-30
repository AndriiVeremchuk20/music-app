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

    console.log(user);
    res.status(200).send({ message: `${type} successful`, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

//registration
route.post("/registration", async (req, res) => {
  try {
    const { firstName, lastName, email, password, uid } = req.body;
    console.log(req.body);

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
