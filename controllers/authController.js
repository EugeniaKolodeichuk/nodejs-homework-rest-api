import { httpCode } from "../lib/constants.js";
import AuthService from "../service/auth.js";
const authService = new AuthService();

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(httpCode.CONFLICT).json({
      status: "error",
      code: httpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  const data = await authService.create(req.body);

  res.status(httpCode.OK).json({ status: "success", code: httpCode.OK, data });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(httpCode.UNAUTHORIZED).json({
      status: "error",
      code: httpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res
    .status(httpCode.OK)
    .json({ status: "success", code: httpCode.OK, data: { token } });
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res
    .status(httpCode.NO_CONTENT)
    .json({ status: "success", code: httpCode.OK, data: {} });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  if (!req.user.token || !req.user.id) {
    return res.status(httpCode.UNAUTHORIZED).json({
      status: "error",
      code: httpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }
  res.json({
    status: "success",
    code: httpCode.OK,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

export { registration, login, logout, current };
