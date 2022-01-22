import jwt from "jsonwebtoken";
import Users from "../repository/usersRepository.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { password, email, subscription, role, avatar, verificationToken } =
      await Users.create(body);
    return { password, email, subscription, role, avatar, verificationToken };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword || !user?.verify) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    return token;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }
}

export default new AuthService();
