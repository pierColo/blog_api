import { blog, post } from "@db/schema";
import { db } from "@db/db";
import { eq, or } from "drizzle-orm";

import type { CreateBlogInputReq, GetBlogInputReq } from "./blog.schemas";

export const createBlog = async (
	data: CreateBlogInputReq["body"]
): Promise<string> => {
	return await db.transaction(async (db) => {
		const blogId = (
			await db
				.insert(blog)
				.values({ ...data })
				.returning({ insertedId: blog.id })
		)[0].insertedId;

		if (data.posts) {
			await db.insert(post).values(
				data.posts.map((post) => ({
					...post,
					blogId,
				}))
			);
		}

		return blogId;
	});
};

export const getBlog = async (
	data: GetBlogInputReq["query"]
): Promise<{
	name: string;
	slug: string;
	posts?:
		| {
				title: string | null;
				content: string;
		  }
		| undefined;
}> => {
	const query = db
		.select({
			name: blog.name,
			slug: blog.slug,
			...(data.includePosts && {
				posts: {
					title: post.title,
					content: post.content,
				},
			}),
		})
		.from(blog)
		.where(
			or(
				data.id ? eq(blog.id, data.id) : undefined,
				data.slug ? eq(blog.slug, data.slug) : undefined
			)
		)
		.$dynamic();

	data.includePosts && query.fullJoin(post, eq(post.blogId, blog.id));

	return (await query.execute())[0];
};

export const getBlogById = async (
	blogId: string
): Promise<{
	name: string;
	slug: string;
	id: string;
}> => {
	return (
		await db.select().from(blog).where(eq(blog.id, blogId)).$dynamic()
	)[0];
};
