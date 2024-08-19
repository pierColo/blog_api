import { db } from "@db/db";
import { post } from "@db/schema";
import type { CreatePost } from "./post.types";

export const createPost = async (data: CreatePost): Promise<string> => {
	return (
		await db.insert(post).values(data).returning({ insertedId: post.id })
	)[0].insertedId;
};
