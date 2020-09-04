import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoControllers";
import passport from "passport";
import {
  join,
  login,
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githunLogin,
  postGithubLogin,
  getMe,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githunLogin);
globalRouter.get(
  routes.githubLoginCallback,
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  postGithubLogin
);

globalRouter.get(routes.me, getMe);
export default globalRouter;
