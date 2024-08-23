import type { Request as ExpressRequest } from "express";

type AnyZodSchema = { [k: string]: any };

export type Request<ZodSchema extends AnyZodSchema = AnyZodSchema> = Omit<
	ExpressRequest,
	"body"
> &
	ZodSchema;

