import jwt from "jsonwebtoken";
import Users from "../repository/usersRepository.js";
import { httpCode } from "../lib/constants.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (e) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(httpCode.UNAUTHORIZED).json({
      status: "error",
      code: httpCode.UNAUTHORIZED,
      message: "Not unauthorized",
    });
  }
  const payload = jwt.decode(token);
  const user = await Users.findById(payload.id);
  if (!user || user.token !== token) {
    return res.status(httpCode.UNAUTHORIZED).json({
      status: "error",
      code: httpCode.UNAUTHORIZED,
      message: "Not unauthorized",
    });
  }
  req.user = user;
  next();
};

export default guard;
