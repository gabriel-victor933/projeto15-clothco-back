import { db } from "../database/database.connection.js";

export const postRegister = (req, res) => {
  console.log("cadastro");
  res.send("cadastro");
};
export const postLogin = (req, res) => {
  console.log("login");
  res.send("login");
};
