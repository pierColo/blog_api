import type { Request } from "../../utils/express.types";
import type { Response } from "express";
import logger from "../../utils/logger";
import type { CreatePostSchemaReq } from "./post.schemas";
import { createPost } from "./post.services";

export const createPostHandler = async (
	req: Request<CreatePostSchemaReq>,
	res: Response
) => {
	try {
		const postId = await createPost(req.body);
		res.status(201).send(`Blog Created with ID:  ${postId}`);
	} catch (err) {
		logger.error(err);
		res.status(400).send("Unable to create Post");
	}
};
