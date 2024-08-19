import type { Request as ExpressRequest } from "express";

type AnyZodSchema = { [k: string]: any };

export type Request<ZodSchema extends AnyZodSchema = AnyZodSchema> = Omit<
	ExpressRequest,
	"body"
> &
	RevZodPreprocess<ZodSchema>;

type RevZodPreprocess<T extends AnyZodSchema> = {
	[K in keyof T]: K extends "params" | "query"
		? { [P in keyof T[K]]: RevDate<RevNumber<T[K][P]>> }
		: T[K];
};
type RevNumber<T> = Rev<T, number>;
type RevDate<T> = Rev<T, Date>;
type Rev<T, R> = T extends R ? Exclude<T, R> | string : T;
