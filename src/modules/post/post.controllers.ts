import type { Request } from "../../utils/express.types";
import type { Response } from "express";
import logger from "../../utils/logger";
import type { CreatePostSchemaReq } from "./post.schemas";
import { formatResponse } from "../../utils/utils";
import services from "@db/services";

export const createPostHandler = async (
	req: Request<CreatePostSchemaReq>,
	res: Response
) => {
	try {
		const postId = await services.post.create(req.body);
		res.status(201).json(
			formatResponse({
				status: 201,
				message: `Post Created`,
				data: { id: postId },
			})
		);
	} catch (err) {
		logger.error(err);
		res.status(400).json(
			formatResponse({ status: 400, message: "Post not created" })
		);
	}
};
