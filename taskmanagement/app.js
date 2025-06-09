import express from "express";
import ur from "./routes/user.routes.js";
 
import "dotenv/config";
import db from "./database/config.js";
import cookieParser  from 'cookie-parser';
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3050;
 

const corsOptions = {
    Origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))
app.use("/", ur);
 
 
db.conn.authenticate();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
