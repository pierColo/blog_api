import { Router } from "express";
import { validate } from "@middlewares/validate";
import { createPostSchema } from "./post.schemas";
import { createPostHandler } from "./post.controllers";

const postRouter = Router();

postRouter.post("/", validate(createPostSchema), createPostHandler);

export default postRouter;
