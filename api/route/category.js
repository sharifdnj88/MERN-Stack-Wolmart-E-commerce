import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "../controllers/categoryController.js";
import { categoryPhoto } from "../utils/multer.js";

const router = express.Router();

// use verify token
router.use(tokenVerify);

// create route
router.route("/").get(getAllCategory).post(categoryPhoto, createCategory);
router.route("/:id").get(getSingleCategory).delete(deleteCategory).put(categoryPhoto, updateCategory);



// export default router
export default router;
