import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvator = multer({ dest: "uploads/avatars/" });
export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "RinaTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  console.log(req.user);
  next();
};
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
export const uploadeVideo = multerVideo.single("videoFile");
export const uploadAvator = multerAvator.single("avatar");
