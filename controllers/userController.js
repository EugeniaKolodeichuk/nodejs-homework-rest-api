import repositoryContacts from "../repository/contactsRepository.js";
import { httpCode } from "../lib/constants.js";
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage,
} from "../service/file-storage/index.js";

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

export { aggregation, uploadAvatar };
