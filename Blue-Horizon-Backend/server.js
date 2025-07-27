<<<<<<< HEAD
import express  from "express";
import cors from "cors";
import userRouter from "./routes/users.routes.js";
import logger from "./logger.js";
import pinoHttp from "pino-http";
import categoryRouter from "./routes/category.routes.js";
import authenticateFirebaseToken from "./middleware/firebaseauth.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// connect to database

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DATABASE,
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});

const app  = express();
const PORT = 3005;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(pinoHttp({logger}));

app.use("/api/users", userRouter);
app.use("/api/category" , categoryRouter);

app.get("/" , (req, res) => {
    res.send("Welcome to Blue Horizon backend API");
    logger.info("GET REQUEST RECEIVED AT /");
})





app.listen(PORT , () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
})
=======
import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import logger from "./logger.js";
import userRouter from "./routes/users.routes.js";
import categoryRouter from "./routes/category.routes.js";
import postRouter from "./routes/post.routes.js";
import commentsRouter from "./routes/comments.routes.js";
import saveLaterRouter from "./routes/saveLater.routes.js";
import tagRouter from "./routes/tag.routes.js";
import postTagRouter from "./routes/postTag.routes.js";
import likeRouter from "./routes/like.routes.js";
import postImageRouter from "./routes/postImage.route.js";

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/post", postRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/savedLater", saveLaterRouter);
app.use("/api/tags", tagRouter);
app.use("/api/post-tag", postTagRouter);
app.use("/api/like", likeRouter);
app.use("/api/post-image", postImageRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Blue Horizon backend API");
    logger.info("GET REQUEST RECEIVED AT /");
});

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
>>>>>>> f758a9522d87d516ce5200b064933e5e17b21924
