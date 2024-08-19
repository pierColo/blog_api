import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
	_err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	res.status(500).send("Internal Server Error");
};
