import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as newToken } from "uuid";

export const postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email: email });
    if (user) return res.status(400).send("Email already exists");

    const cryptPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: cryptPassword,
    };

    await db.collection("users").insertOne(newUser);

    res.send("User created successfully");
  } catch (err) {
    console.log("Error creating user: ", err);
  }
};
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email: email });
    if (!user) return res.status(400).send("Email doesn't exists");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Password incorrect");

    const token = newToken();
    await db.collection("users").updateOne(user, { $set: { token: token } });

    res.status(200).send(token);
  } catch (err) {
    console.log("Error logging in: ", err);
  }
  res.send("login");
};
