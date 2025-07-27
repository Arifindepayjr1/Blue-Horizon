<<<<<<< HEAD
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
})

export default pool;
=======
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
});

export default pool;
>>>>>>> f758a9522d87d516ce5200b064933e5e17b21924
