import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";
import logger from "../utils/logger";

export const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			const tmp = schema.parse({
				params: req.params,
				query: req.query,
				body: req.body,
			}) as Request;

			Object.assign(req.query, tmp.query);
			Object.assign(req.params, tmp.params);
			Object.assign(req.body, tmp.body);

			next();
		} catch (e: unknown) {
			logger.error(e);
			res.status(400).send("Validiation Error");
		}
	};
