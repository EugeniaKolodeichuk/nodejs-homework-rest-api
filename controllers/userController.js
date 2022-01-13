import { httpCode } from "../lib/constants";

const uploadAvatar = async (req, res, next) => {
  res
    .status(httpCode.OK)
    .json({ status: "success", code: httpCode.OK, message: "Success!" });
};

export { uploadAvatar };
