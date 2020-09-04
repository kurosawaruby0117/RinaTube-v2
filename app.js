import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./router/globalRouter";
import userRouter from "./router/useRouter";
import videoRouter from "./router/videoRouter";
import routes from "./routes";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import passport from "passport";
import dotenv from "dotenv";
import "./passport";
const app = express();
const CookieStore = MongoStore(session);
dotenv.config();

app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: "dskahfgshaashdska",
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
export default app;
