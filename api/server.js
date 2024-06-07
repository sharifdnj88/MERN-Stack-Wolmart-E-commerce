import express from "express";
import mongoDBConnect from "./config/db.js";
import dotenv from "dotenv";
import "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./route/user.js";
import authRouter from "./route/auth.js";
import brandRouter from "./route/brand.js";
import tagRouter from "./route/tag.js";
import categoryRouter from "./route/category.js";
import productRouter from "./route/product.js";
import permissionRouter from "./route/permission.js";
import roleRouter from "./route/role.js";

// initialization
const app = express();
dotenv.config();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// set environment vars
const PORT = process.env.PORT || 9090;

// static folder
app.use(express.static("public"));

// routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/permission", permissionRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

// use error handler


// app listen
app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
