import express from "express";
import routes from "../routes";
const videoRouter = express.Router();
import {
  videos,
  upload,
  videoDetail,
  editVideo,
  deleteVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
} from "../controllers/videoControllers";
import { postLogin } from "../controllers/userController";
import { uploadeVideo, onlyPrivate } from "../middlewares";
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadeVideo, postUpload);
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
videoRouter.get(routes.deleteVideo(), deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);
export default videoRouter;
