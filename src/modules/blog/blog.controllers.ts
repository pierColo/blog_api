import type { Request } from "../../utils/express.types";
import type { Response } from "express";
import type { CreateBlogInputReq, GetBlogInputReq } from "./blog.schemas";
import logger from "../../utils/logger";
import { formatResponse } from "../../utils/utils";
import services from "@db/services";

export const createBlogHandler = async (
	req: Request<CreateBlogInputReq>,
	res: Response
) => {
	try {
		const blogId = await services.blog.create(req.body);

		res.status(201).json(
			formatResponse({
				status: 201,
				message: `Blog Created`,
				data: { id: blogId },
			})
		);
	} catch (err) {
		logger.error(err);
		res.status(400).json(
			formatResponse({ status: 400, message: "Blog not created" })
		);
	}
};

export const getBlogHandler = async (
	req: Request<GetBlogInputReq>,
	res: Response
) => {
	try {
		const blog = await services.blog.get(req.query);

		if (!blog) {
			res.status(400).json(
				formatResponse({
					status: 400,
					message: "No blog found",
				})
			);
		}
		res.status(200).json(
			formatResponse({ status: 200, message: "Blog found", data: blog })
		);
	} catch (err) {
		logger.error(err);
		res.status(400).json(
			formatResponse({ status: 400, message: "Blog not found" })
		);
	}
};
