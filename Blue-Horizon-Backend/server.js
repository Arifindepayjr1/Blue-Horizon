import express  from "express";
import cors from "cors";
import userRouter from "./routes/users.routes.js";
import logger from "./logger.js";
import pinoHttp from "pino-http";
import categoryRouter from "./routes/category.routes.js";




const app  = express();
const PORT = 3005;


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