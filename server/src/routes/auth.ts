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

//registration
route.post("/registration", async (req, res) => {
  try {
    const { firstName, lastName, email, password, uid } = req.body.user;
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

/*
  user: {
    firstName: 'Андрей',
    lastName: 'Веремчук',
    email: 'andrei2k2@meta.ua',
    password: '123456',
    repPasword: '123456',
    uid: 'GIMIRUhPltWc478QL4rc2Apng8n2'
  }

*/

//login
route.post("/login", (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send({ text: "Route test good" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

export default route;
