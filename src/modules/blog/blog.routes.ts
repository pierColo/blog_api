import { Router } from "express";
import { createBlogSchema, getBlogSchema } from "./blog.schemas";
import { createBlogHandler, getBlogHandler } from "./blog.controllers";
import { validate } from "@middlewares/validate";

const blogRouter = Router();

blogRouter.get("/", validate(getBlogSchema), getBlogHandler);

blogRouter.post("/", validate(createBlogSchema), createBlogHandler);

export default blogRouter;
