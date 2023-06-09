import { db } from "../database/database.connection.js";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default auth;
