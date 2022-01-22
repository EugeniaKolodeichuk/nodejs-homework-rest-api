import repositoryContacts from "../repository/contactsRepository.js";
import repositoryUsers from "../repository/usersRepository.js";
import { httpCode } from "../lib/constants.js";
import {
  UploadFileService,
  LocalFileStorage,
} from "../service/file-storage/index.js";
import { EmailService, SenderSendgrid } from "../service/email/";

const aggregation = async (req, res, next) => {
  const { id } = req.params;
  const data = await repositoryContacts.getStatisticsContacts(id);
  if (data) {
    return res
      .status(httpCode.OK)
      .json({ status: "success", code: httpCode.OK, data });
  }
  res
    .status(httpCode.NOT_FOUND)
    .json({ status: "error", code: httpCode.NOT_FOUND, message: "Not found" });
};

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user
  );
  const avatarUrl = await uploadService.updateAvatar();
  res
    .status(httpCode.OK)
    .json({ status: "success", code: httpCode.OK, data: { avatarUrl } });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);
    return res.status(httpCode.OK).json({
      status: "success",
      code: httpCode.OK,
      data: { message: "Success" },
    });
  }
  res.status(httpCode.BAD_REQUEST).json({
    status: "success",
    code: httpCode.BAD_REQUEST,
    data: { message: "Invalid token" },
  });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await repositoryUsers.findByEmail(email);
  if (user) {
    const { email, name, verificationToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid()
    );

    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verificationToken
    );
    if (isSend) {
      return res.status(httpCode.OK).json({
        status: "success",
        code: httpCode.OK,
        data: { message: "Success" },
      });
    }
    return res.status(httpCode.UNPROCESSABLE_ENTITY).json({
      status: "error",
      code: httpCode.UNPROCESSABLE_ENTITY,
      data: { message: "Unprocessable Entity" },
    });
  }

  res.status(httpCode.NOT_FOUND).json({
    status: "error",
    code: httpCode.NOT_FOUND,
    data: { message: "User with email not found" },
  });
};

export { aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser };
