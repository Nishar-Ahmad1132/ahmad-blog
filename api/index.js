import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();


const DB =
  "mongodb+srv://ahmadnishar1132:Nishar1132@cluster0.kj6kfgn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connected..");
  })
  .catch((e) => {
    console.log("Error occurred ", e);
  });


app.use(express.json());
app.listen(3000, () => {
  console.log("Server running...");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


app.use( (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
});