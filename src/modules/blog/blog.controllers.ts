import type { Request } from "../../utils/express.types";
import type { Response } from "express";
import type { CreateBlogInputReq, GetBlogInputReq } from "./blog.schemas";
import logger from "../../utils/logger";
import { createBlog, getBlog } from "./blog.services";

export const createBlogHandler = async (
	req: Request<CreateBlogInputReq>,
	res: Response
) => {
	try {
		const blogId = await createBlog(req.body);

		res.status(201).send(`Blog Created with ID:  ${blogId}`);
	} catch (err) {
		logger.error(err);
		res.status(400).send("Unable to create blog");
	}
};

export const getBlogHandler = async (
	req: Request<GetBlogInputReq>,
	res: Response
) => {
	try {
		const blog = await getBlog(req.query);
		res.status(200).json(blog);
	} catch (err) {
		logger.error(err);
		res.status(400).send("No blog found");
	}
};
